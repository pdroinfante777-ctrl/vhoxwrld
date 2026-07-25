import type { TranslationKey } from '../i18n/translations'

export const fiberStages: {
  id: 'bat' | 'tshirt' | 'cap' | 'hoodie' | 'wordmark'
  index: string
  nameKey: TranslationKey
  detailKey: TranslationKey
}[] = [
  { id: 'bat', index: '01', nameKey: 'fiber.bat.name', detailKey: 'fiber.bat.detail' },
  { id: 'tshirt', index: '02', nameKey: 'fiber.shirt.name', detailKey: 'fiber.shirt.detail' },
  { id: 'cap', index: '03', nameKey: 'fiber.cap.name', detailKey: 'fiber.cap.detail' },
  { id: 'hoodie', index: '04', nameKey: 'fiber.hoodie.name', detailKey: 'fiber.hoodie.detail' },
  { id: 'wordmark', index: '05', nameKey: 'fiber.wordmark.name', detailKey: 'fiber.wordmark.detail' },
]

export const fiberStageOrder = fiberStages.map((stage) => stage.id)
