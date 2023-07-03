export type Config = {
  color: 'black' | 'white'
  font: string
  name: string
  server: string
  title: string
  image: any
  scale: number
  job: string
  jobs: string[]
  progress: string
  expansion: string
  like: string
  dislike: string
  mastodonName: string
  handle: string
  mastodonMain: string
  mastodonSub: string
  orientations: string[]
  couplings: string[]
  avoids: string[]
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
  jobs: ['warrior', 'whitemage', 'ninja', 'reaper', 'summoner', 'redmage', 'goldsmith', 'alchemist', 'culinarian', 'miner'],
  progress: 'v6.2 완료',
  expansion: 'endwalker',
  like: '절 영식',
  dislike: '스포일러',
  mastodonName: '초크',
  handle: '@chalk@chalk.moe',
  mastodonMain: '파판14',
  mastodonSub: '명일방주',
  orientations: [],
  couplings: [],
  avoids: [],
}

export const progress = [
  { label: 'v2.0 신생 에오르제아', value: 'v2.0 완료' },
  { label: 'v2.3 에오르제아의 수호자', value: 'v2.3 완료' },
  { label: 'v2.4 빙결의 환상', value: 'v2.4 완료' },
  { label: 'v2.5 희망의 등불', value: 'v2.5 완료' },
  { label: 'v3.0 창천의 이슈가르드', value: 'v3.0 완료' },
  { label: 'v3.1 빛과 어둠의 경계', value: 'v3.1 완료' },
  { label: 'v3.2 운명의 톱니바퀴', value: 'v3.2 완료' },
  { label: 'v3.3 최후의 포효', value: 'v3.3 완료' },
  { label: 'v3.4 혼을 계승하는 자', value: 'v3.4 완료' },
  { label: 'v3.5 숙명의 끝', value: 'v3.5 완료' },
  { label: 'v4.0 홍련의 해방자', value: 'v4.0 완료' },
  { label: 'v4.1 영웅의 귀환', value: 'v4.1 완료' },
  { label: 'v4.2 새벽의 빛', value: 'v4.2 완료' },
  { label: 'v4.3 월하의 꽃', value: 'v4.3 완료' },
  { label: 'v4.4 광란의 전주곡', value: 'v4.4 완료' },
  { label: 'v4.5 영웅을 위한 진혼가', value: 'v4.5 완료' },
  { label: 'v5.0 칠흑의 반역자', value: 'v5.0 완료' },
  { label: 'v5.1 하얀 서약, 검은 밀약', value: 'v5.1 완료' },
  { label: 'v5.2 추억의 흉성', value: 'v5.2 완료' },
  { label: 'v5.3 크리스탈의 잔광', value: 'v5.3 완료' },
  { label: 'v5.4 또 하나의 미래', value: 'v5.4 완료' },
  { label: 'v5.5 여명의 사투', value: 'v5.5 완료' },
  { label: 'v6.0 효월의 종언', value: 'v6.0 완료' },
  { label: 'v6.1 새로운 모험', value: 'v6.1 완료' },
  { label: 'v6.2 금단의 기억', value: 'v6.2 완료' },
  { label: 'v6.3 하늘의 축제, 땅의 전율', value: 'v6.3 완료' },
  { label: 'v6.4 옥좌의 죄인', value: 'v6.4 완료' },
]

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

export const jobsByRole = {
  tank: ['paladin', 'warrior', 'darkknight', 'gunbreaker'],
  healer: ['whitemage', 'scholar', 'astrologian', 'sage'],
  dps: [
    'monk',
    'dragoon',
    'ninja',
    'samurai',
    'reaper',
    'bard',
    'machinist',
    'dancer',
    'blackmage',
    'summoner',
    'redmage',
    'bluemage',
  ],
  crafter: ['carpenter', 'blacksmith', 'armorer', 'goldsmith', 'leatherworker', 'weaver', 'alchemist', 'culinarian'],
  gatherer: ['miner', 'botanist', 'fisher'],
}

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

export const orientations = ['부스트', '관심글', '일상', '자캐', '덕질', '로컬', '연합'].map((x) => ({
  label: x,
  value: x,
}))

export const coupling = ['HL', 'BL', 'GL', '드림', '논커플링', '올라운더', '1차창작', '2차창작'].map((x) => ({
  label: x,
  value: x,
}))

export const avoids = ['고어', '스포일러', '리버스', '리버시블', '드림', '겹드림', 'RPS'].map((x) => ({
  label: x,
  value: x,
}))

// 플레이 스타일
// https://xivapi.com/docs/Icons?set=icons061000
