import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { en } from './locales/en'
import { uz } from './locales/uz'
import { ru } from './locales/ru'

export type Lang = 'en' | 'uz' | 'ru'

const DICTS = { en, uz, ru } as const

export const LANGUAGES: { code: Lang; label: string; short: string }[] = [
  { code: 'uz', label: 'Oʻzbekcha', short: 'UZ' },
  { code: 'ru', label: 'Русский', short: 'RU' },
  { code: 'en', label: 'English', short: 'EN' },
]

const STORAGE_KEY = 'bigaxel:lang:v1'

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: <T = string>(key: string, vars?: Record<string, string | number>) => T
}

const LangContext = createContext<Ctx>({
  lang: 'en',
  setLang: () => {},
  t: ((key: string) => key) as Ctx['t'],
})

function detectLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'uz' || saved === 'ru') return saved
  } catch {
    /* ignore */
  }
  const nav = navigator.language?.slice(0, 2).toLowerCase()
  if (nav === 'uz') return 'uz'
  if (nav === 'ru') return 'ru'
  return 'en'
}

function resolve(dict: unknown, parts: string[]): unknown {
  let cur: unknown = dict
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[p]
    } else {
      return undefined
    }
  }
  return cur
}

function interpolate(str: string, vars?: Record<string, string | number>): string {
  if (!vars) return str
  return str.replace(/\{\{(\w+)\}\}/g, (_, k: string) =>
    k in vars ? String(vars[k]) : `{{${k}}}`
  )
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }

  const value = useMemo<Ctx>(() => {
    const t: Ctx['t'] = <T = string,>(key: string, vars?: Record<string, string | number>) => {
      const parts = key.split('.')
      const primary = resolve(DICTS[lang], parts)
      const fallback = primary === undefined ? resolve(DICTS.en, parts) : primary
      if (fallback === undefined) return key as unknown as T
      if (typeof fallback === 'string') return interpolate(fallback, vars) as unknown as T
      return fallback as T
    }
    return { lang, setLang, t }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useT() {
  return useContext(LangContext).t
}

export function useLang() {
  return useContext(LangContext)
}
