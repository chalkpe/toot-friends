export type Config = {
  color: 'black' | 'white'
  font: string
  name: string
  server: string
  title: string
  image: any
  scale: number
  job: string
  progress: string,
  expansion: string
  like: string
  dislike: string
  handle: string
}

export const defaultConfig: Config = {
  color: 'black',
  font: '나눔바른펜',
  name: '초크',
  server: '초코보',
  title: '궁극의 전설',
  image: null,
  scale: 1,
  job: 'summoner',
  progress: 'v6.3 완료',
  expansion: 'endwalker',
  like: '절 영식',
  dislike: '스포일러',
  handle: '@chalk@chalk.moe',
}

export const expansions = [
  { label: '신생 에오르제아', value: 'arealmreborn' },
  { label: '창천의 이슈가르드', value: 'heavensward' },
  { label: '홍련의 해방자', value: 'stormblood' },
  { label: '칠흑의 반역자', value: 'shadowbringers' },
  { label: '효월의 종언', value: 'endwalker' },
]

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
  null,
  'carpenter',
  'blacksmith',
  'armorer',
  'goldsmith',
  'leatherworker',
  'weaver',
  'alchemist',
  'culinarian',
  null,
  'miner',
  'botanist',
  'fisher',
]

export const servers = [
  {
    label: 'Korea',
    options: ['카벙클', '초코보', '모그리', '톤베리', '펜리르'],
  },
  {
    label: 'Elemental',
    options: ['Aegis', 'Atomos', 'Carbuncle', 'Garuda', 'Gungnir', 'Kujata', 'Tonberry', 'Typhon'],
  },
  {
    label: 'Gaia',
    options: ['Alexander', 'Bahamut', 'Durandal', 'Fenrir', 'Ifrit', 'Ridill', 'Tiamat', 'Ultima'],
  },
  {
    label: 'Mana',
    options: ['Anima', 'Asura', 'Chocobo', 'Hades', 'Ixion', 'Masamune', 'Pandaemonium', 'Titan'],
  },
  {
    label: 'Meteor',
    options: ['Belias', 'Mandragora', 'Ramuh', 'Shinryu', 'Unicorn', 'Valefor', 'Yojimbo', 'Zeromus'],
  },
  {
    label: 'Aether',
    options: ['Adamantoise', 'Cactuar', 'Faerie', 'Gilgamesh', 'Jenova', 'Midgardsormr', 'Sargatanas', 'Siren'],
  },
  {
    label: 'Crystal',
    options: ['Balmung', 'Brynhildr', 'Coeurl', 'Diabolos', 'Goblin', 'Malboro', 'Mateus', 'Zalera'],
  },
  {
    label: 'Dynamis',
    options: ['Halicarnassus', 'Maduin', 'Marilith', 'Seraph'],
  },
  {
    label: 'Primal',
    options: ['Behemoth', 'Excalibur', 'Exodus', 'Famfrit', 'Hyperion', 'Lamia', 'Leviathan', 'Ultros'],
  },
  {
    label: 'Chaos',
    options: ['Cerberus', 'Louisoix', 'Moogle', 'Omega', 'Phantom', 'Ragnarok', 'Sagittarius', 'Spriggan'],
  },
  {
    label: 'Light',
    options: ['Alpha', 'Lich', 'Odin', 'Phoenix', 'Raiden', 'Shiva', 'Twintania', 'Zodiark'],
  },
  {
    label: 'Materia',
    options: ['Bismarck', 'Ravana', 'Sephirot', 'Sophia', 'Zurvan'],
  },
]
