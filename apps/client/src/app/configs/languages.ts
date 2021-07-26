export const DEFAULT_LANGUAGE = 'en'

export interface Language {
  language: string
  name: string
}
export const LANGUAGES: Language[] = [
  { language: 'ja', name: '日本語' },
  { language: 'en', name: 'English' },
]
export const ALLOW_LANGUAGES = ['ja', 'en']
