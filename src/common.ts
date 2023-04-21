export type Config = {
  color: 'black' | 'white'
  font: string
  name: string
  server: string
  title: string
  image: any
  scale: number
  job: string
}

export const defaultConfig: Config = {
  color: 'black',
  font: 'Noto Sans KR',
  name: '초크',
  server: '초코보',
  title: '궁극의 전설',
  image: null,
  scale: 1,
  job: 'summoner',
}

export const iconPrefix = 'https://raw.githubusercontent.com/xivapi/classjob-icons/master/icons'

export const jobs = [
  'paladin',
  'warrior',
  'darkknight',
  'gunbreaker',
  null,
  'whitemage',
  'scholar',
  'astrologian',
  'sage',
  null,
  'monk',
  'dragoon',
  'ninja',
  'samurai',
  'reaper',
  null,
  'bard',
  'machinist',
  'dancer',
  null,
  'blackmage',
  'summoner',
  'redmage',
  'bluemage',
]
