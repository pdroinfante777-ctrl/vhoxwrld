import type { TranslationKey } from '../i18n/translations'

export type CategoryVisualName = 'shirt' | 'cap' | 'shoe' | 'future'

export const categories: {
  index: string
  nameKey: TranslationKey
  stateKey: TranslationKey
  visual: CategoryVisualName
}[] = [
  { index: '01', nameKey: 'categories.shirt.name', stateKey: 'categories.shirt.state', visual: 'shirt' },
  { index: '02', nameKey: 'categories.cap.name', stateKey: 'categories.cap.state', visual: 'cap' },
  { index: '03', nameKey: 'categories.shoe.name', stateKey: 'categories.shoe.state', visual: 'shoe' },
  { index: '04', nameKey: 'categories.future.name', stateKey: 'categories.future.state', visual: 'future' },
] as const
