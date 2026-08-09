import type { TranslationKey } from '../i18n/translations'

export type MaterialStudy = {
  id: 'void-green' | 'abyss-blue' | 'blood-red' | 'earth-brown' | 'midnight-purple'
  index: string
  name: string
  copyKey: TranslationKey
  undertone: string
  undertoneRgb: string
}

export const materialStudies: MaterialStudy[] = [
  {
    id: 'void-green',
    index: 'MS-01',
    name: 'VOID GREEN',
    copyKey: 'materialSystem.voidGreen',
    undertone: '#315b3d',
    undertoneRgb: '49, 91, 61',
  },
  {
    id: 'abyss-blue',
    index: 'MS-02',
    name: 'ABYSS BLUE',
    copyKey: 'materialSystem.abyssBlue',
    undertone: '#28466f',
    undertoneRgb: '40, 70, 111',
  },
  {
    id: 'blood-red',
    index: 'MS-03',
    name: 'BLOOD RED',
    copyKey: 'materialSystem.bloodRed',
    undertone: '#70252d',
    undertoneRgb: '112, 37, 45',
  },
  {
    id: 'earth-brown',
    index: 'MS-04',
    name: 'EARTH BROWN',
    copyKey: 'materialSystem.earthBrown',
    undertone: '#65472f',
    undertoneRgb: '101, 71, 47',
  },
  {
    id: 'midnight-purple',
    index: 'MS-05',
    name: 'MIDNIGHT PURPLE',
    copyKey: 'materialSystem.midnightPurple',
    undertone: '#513461',
    undertoneRgb: '81, 52, 97',
  },
]

export function getMaterialStudy(id: MaterialStudy['id']) {
  return materialStudies.find((study) => study.id === id) ?? materialStudies[0]
}
