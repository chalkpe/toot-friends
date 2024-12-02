export type Config = {
  color: 'black' | 'white' | 'black2' | 'white2'
  font: string
  titleFont: string
  name: string
  server: string
  title: string
  image: any
  scale: number
  job: string
  jobs: string[]
  progress: string
  expansion: string
  expansionOngoing: boolean
  company: string
  grade: string
  eurekaLevel: number | undefined
  bozjaLevel: number | undefined
  like: string
  dislike: string
  mastodonName: string
  handle: string
  mastodonMain: string
  mastodonSub: string
  orientations: string[]
  couplings: string[]
  avoids: string[]
  playtime: boolean[]
  playstyles: string[]
  comment: string
}

export const defaultConfig: Config = {
  color: 'black',
  font: '나눔바른펜OTF',
  titleFont: 'KoPub Dotum',
  name: '',
  server: '',
  title: '',
  image: null,
  scale: 1,
  job: '',
  jobs: [],
  progress: '',
  expansion: '',
  expansionOngoing: false,
  company: '',
  grade: '',
  eurekaLevel: undefined,
  bozjaLevel: undefined,
  like: '',
  dislike: '',
  mastodonName: '',
  handle: '',
  mastodonMain: '',
  mastodonSub: '',
  orientations: [],
  couplings: [],
  avoids: [],
  playtime: Array(24).fill(false),
  playstyles: [],
  comment: '',
}

export const expansions = [
  {
    label: '신생 에오르제아',
    value: 'arealmreborn',
    options: [
      { label: 'v2.0 신생 에오르제아', value: 'v2.0' },
      { label: 'v2.3 에오르제아의 수호자', value: 'v2.3' },
      { label: 'v2.4 빙결의 환상', value: 'v2.4' },
      { label: 'v2.5 희망의 등불', value: 'v2.5' },
    ],
  },
  {
    label: '창천의 이슈가르드',
    value: 'heavensward',
    options: [
      { label: 'v3.0 창천의 이슈가르드', value: 'v3.0' },
      { label: 'v3.1 빛과 어둠의 경계', value: 'v3.1' },
      { label: 'v3.2 운명의 톱니바퀴', value: 'v3.2' },
      { label: 'v3.3 최후의 포효', value: 'v3.3' },
      { label: 'v3.4 혼을 계승하는 자', value: 'v3.4' },
      { label: 'v3.5 숙명의 끝', value: 'v3.5' },
    ],
  },
  {
    label: '홍련의 해방자',
    value: 'stormblood',
    options: [
      { label: 'v4.0 홍련의 해방자', value: 'v4.0' },
      { label: 'v4.1 영웅의 귀환', value: 'v4.1' },
      { label: 'v4.2 새벽의 빛', value: 'v4.2' },
      { label: 'v4.3 월하의 꽃', value: 'v4.3' },
      { label: 'v4.4 광란의 전주곡', value: 'v4.4' },
      { label: 'v4.5 영웅을 위한 진혼가', value: 'v4.5' },
    ],
  },
  {
    label: '칠흑의 반역자',
    value: 'shadowbringers',
    options: [
      { label: 'v5.0 칠흑의 반역자', value: 'v5.0' },
      { label: 'v5.1 하얀 서약, 검은 밀약', value: 'v5.1' },
      { label: 'v5.2 추억의 흉성', value: 'v5.2' },
      { label: 'v5.3 크리스탈의 잔광', value: 'v5.3' },
      { label: 'v5.4 또 하나의 미래', value: 'v5.4' },
      { label: 'v5.5 여명의 사투', value: 'v5.5' },
    ],
  },
  {
    label: '효월의 종언',
    value: 'endwalker',
    options: [
      { label: 'v6.0 효월의 종언', value: 'v6.0' },
      { label: 'v6.1 새로운 모험', value: 'v6.1' },
      { label: 'v6.2 금단의 기억', value: 'v6.2' },
      { label: 'v6.3 하늘의 축제, 땅의 전율', value: 'v6.3' },
      { label: 'v6.4 옥좌의 죄인', value: 'v6.4' },
      { label: 'v6.5 광명의 시작', value: 'v6.5' },
    ],
  },
  {
    label: '황금의 유산',
    value: 'dawntrail',
    options: [
      { label: 'v7.0 황금의 유산', value: 'v7.0' },
      { label: 'v7.1 미지와의 해후', value: 'v7.1' },
    ],
  },
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
  'viper',
  null,
  'bard',
  'machinist',
  'dancer',
  null,
  'blackmage',
  'summoner',
  'redmage',
  'pictomancer',
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
  dps: ['monk', 'dragoon', 'ninja', 'samurai', 'reaper', 'viper', 'bard', 'machinist', 'dancer', 'blackmage', 'summoner', 'redmage', 'pictomancer', 'bluemage'],
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

export const playstyles = {
  mainscenario: '주요 퀘스트',
  dungeons: '던전',
  trials: '토벌전',
  raids: '레이드',
  ultimateraids: '절 레이드',
  deepdungeons: '딥 던전',
  fieldoperations: '특수 필드 탐색',
  vandcdungeons: '특수 던전 탐색',
  pvp: 'PvP',
  dutyroulette: '무작위 임무',
  bluemage: '청마도사',
  treasurehunts: '보물찾기',
  thehunt: '마물 사냥',
  goldsaucer: '골드 소서',
  domanmahjong: '작패유희',
  islandsanctuary: '무인도 개척',
  crafting: '제작',
  botanymining: '채광/원예',
  fishing: '낚시',
  leveling: '레벨 올리기',
  roleplaying: '역할극',
  casual: '부담 없이 즐기기',
  hardcore: '진지한 공략',
  newadventurer: '초보자',
  mentor: '멘토',
  makinggil: '길 모으기',
  achievements: '업적 수집',
  housing: '하우징',
  performancemode: '악기 연주',
  glamour: '장비 투영',
  grouppose: '단체 자세',
  playerchat: '대화 나누기',
  communityevents: '플레이어 이벤트',
  // none: '없음',
}

export const companies = ['불멸대', '쌍사당', '흑와단'].map((x) => ({
  label: x,
  value: x,
}))

export const grades = ['이병', '일병', '상병', '병장', '하사', '중사', '상사', '원사', '소위', '중위', '대위'].map((x) => ({
  label: x,
  value: x,
}))
