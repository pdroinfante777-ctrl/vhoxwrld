import type { TranslationKey } from '../i18n/translations'

export type HeroScene = {
  id: 'bat' | 'rose' | 'void'
  index: string
  titleKey: TranslationKey
  detailKey: TranslationKey
  visual: 'bat' | 'rose' | 'void'
}

export const heroScenes: HeroScene[] = [
  {
    id: 'bat',
    index: '01',
    titleKey: 'hero.sceneBat',
    detailKey: 'hero.sceneBatDetail',
    visual: 'bat',
  },
  {
    id: 'rose',
    index: '02',
    titleKey: 'hero.sceneRose',
    detailKey: 'hero.sceneRoseDetail',
    visual: 'rose',
  },
  {
    id: 'void',
    index: '03',
    titleKey: 'hero.sceneVoid',
    detailKey: 'hero.sceneVoidDetail',
    visual: 'void',
  },
]

export type DropChapter = {
  id: 'bat' | 'rose' | 'void'
  index: string
  title: string
  edition: string
  copyKey: TranslationKey
  path: string
}

export const dropChapters: DropChapter[] = [
  {
    id: 'bat',
    index: '01',
    title: 'BAT',
    edition: 'VHX-D001-01',
    copyKey: 'drop.batCopy',
    path: '/collections/bat/',
  },
  {
    id: 'rose',
    index: '02',
    title: 'ROSE',
    edition: 'VHX-D001-02',
    copyKey: 'drop.roseCopy',
    path: '/collections/rose/',
  },
  {
    id: 'void',
    index: '03',
    title: 'VOID',
    edition: 'VHX-D001-03',
    copyKey: 'drop.voidCopy',
    path: '/collections/void/',
  },
]

export type DetailStudy = {
  id: 'embroidery' | 'textile' | 'seam' | 'silhouette'
  index: string
  labelKey: TranslationKey
  copyKey: TranslationKey
}

export const detailStudies: DetailStudy[] = [
  {
    id: 'embroidery',
    index: '01',
    labelKey: 'details.embroidery',
    copyKey: 'details.embroideryCopy',
  },
  {
    id: 'textile',
    index: '02',
    labelKey: 'details.textile',
    copyKey: 'details.textileCopy',
  },
  {
    id: 'seam',
    index: '03',
    labelKey: 'details.seam',
    copyKey: 'details.seamCopy',
  },
  {
    id: 'silhouette',
    index: '04',
    labelKey: 'details.silhouette',
    copyKey: 'details.silhouetteCopy',
  },
]

export type JournalEntry = {
  id: 'origin' | 'drop' | 'world'
  index: string
  titleKey: TranslationKey
  copyKey: TranslationKey
  href: string
}

export const journalEntries: JournalEntry[] = [
  {
    id: 'origin',
    index: '01',
    titleKey: 'journal.origin',
    copyKey: 'journal.originCopy',
    href: '#manifesto',
  },
  {
    id: 'drop',
    index: '02',
    titleKey: 'journal.drop',
    copyKey: 'journal.dropCopy',
    href: '#drop-001',
  },
  {
    id: 'world',
    index: '03',
    titleKey: 'journal.world',
    copyKey: 'journal.worldCopy',
    href: '#vhox-world',
  },
]
