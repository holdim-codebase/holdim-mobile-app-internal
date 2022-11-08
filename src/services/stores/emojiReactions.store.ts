import { observable, action, computed } from 'mobx'

import { TEmojiReactions } from '../../types'
import { thumbsDown, thumbsUp, shit, partyPopper } from '../../constants/emojis'

class EmojiReactionsStore {
  @observable emojis: TEmojiReactions[] = []

  @action 
  setEmojis = (emojis: TEmojiReactions[]) => {
    this.emojis = emojis
    console.warn(emojis)
  }

  @action 
  pickEmoji = (id: string) => {
    console.warn(id)
  }

  @computed
  get mappedEmojis() {
    const mapping: {[k in string]: string} = {
      '1': partyPopper,
      '2': shit,
      '3': thumbsDown,
      '4': thumbsUp
    }
    return this.emojis.map((emoji) => {
      return {
        ...emoji,
        unicode: mapping[emoji.id]
      }
    })
  }
}

export default new EmojiReactionsStore()