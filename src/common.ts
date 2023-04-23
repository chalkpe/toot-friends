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
