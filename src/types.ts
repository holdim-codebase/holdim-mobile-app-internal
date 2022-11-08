export type TProposal = {
  id: string
  snapshotId: string
  title: string
  dao: {
    id: string
    name: string
    logo: string
    personalizedData: {followed: boolean}
  }
  juniorDescription: string
  middleDescription: string
  seniorDescription: string
  startAt: number
  endAt: number
  author: string
  snapshotLink: string
  discussionLink: string
  personalizedData: {
    pickedEmojiId: string
  }
  statisticData: {
    emojiCount: [{emojiId: string, count: number}]
  }
}

export type TPoll = {
  id: string
  poll: {
    scores: number[]
    choices: string[]
    symbol: string
    scores_total: number
    votes: number
    quorum: number
  }
}

export type TDAO = {
  id: string
  snapshotId: string
  name: string
  logo: string
  overview: string
  tokenOverview: string
  tokens: [
    {
      id: string
      name: string
      totalSupply: number
      price: number
      personalizedData: {
        quantity: number
      }
      symbol: string
    },
  ]
  personalizedData: {followed: boolean}
}

export type TUser = {
  id: string
  avatarUrl: string
  wallets: TWallet[]
  followedDaos: [
    {
      id: string
      name: string
      logo: string
      tokens: TToken[]
    },
  ]
}

export type TTokenPersonalizedData = {
  quantity: string
}

export type TToken = {
  id: string
  name: string
  main: boolean
  personalizedData: TTokenPersonalizedData
  totalSupply: number
  price: number
  symbol: string
}

export type TWallet = {
  id: string
  address: string
  ens: string
  tokens: TToken[]
}

export type TSlide = {
  id: string
  title: string
  subtitle: string
}

export type TEmojiReactions = {
  id: string,
  url: string
}