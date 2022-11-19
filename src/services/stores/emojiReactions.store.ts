import { observable, action, computed } from 'mobx'

import { TEmojiReactions } from '../../types'

class EmojiReactionsStore {
  @observable emojis: TEmojiReactions[] = []

  @action 
  setEmojis = (emojis: TEmojiReactions[]) => {
    this.emojis = emojis
  }

  @computed
  getEmojiById = (id: string) => {
    return this.emojis.find(emoji => emoji.id === id)
  }
}

export default new EmojiReactionsStore()