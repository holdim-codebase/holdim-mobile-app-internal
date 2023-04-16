import {observable, action, makeObservable} from 'mobx'
import {TEmojiReactions, TProposal} from '../../types'

class EmojiReactionsStore {
  emojis: TEmojiReactions[] = []

  constructor() {
    makeObservable(this, {
      emojis: observable,
      setEmojis: action,
    })
  }

  setEmojis = (emojis: TEmojiReactions[]) => {
    this.emojis = emojis
  }

  getEmojiById = (id: string) => {
    return this.emojis.find(emoji => emoji.id === id)
  }

  getFamousReactions = (
    reactions: TProposal['statisticData']['emojiCount'],
    pickedEmoji: string | null,
  ) => {
    const emojis = [...reactions]
    const sortedEmojis = emojis
      .sort((a, b) => b.count - a.count)
      .filter(emoji => emoji.count)

    if (sortedEmojis.length === 1) {
      if (!!pickedEmoji) {
        const pickedReactionAmongAll = emojis.find(
          reaction => reaction.emojiId === pickedEmoji,
        )
        if (sortedEmojis[0].emojiId !== pickedEmoji) {
          if (pickedReactionAmongAll) {
            sortedEmojis.push(pickedReactionAmongAll)
          }
        }
      }
    }

    return sortedEmojis.length > 1 ? sortedEmojis.slice(0, 2) : sortedEmojis
  }

  getAllReactionsCountByProposal = (
    reactions: TProposal['statisticData']['emojiCount'],
    pickedEmoji: string | null,
    wasInitialPicked: boolean,
  ) => {
    const initialValue = wasInitialPicked
      ? !!pickedEmoji
        ? 0
        : -1
      : !!pickedEmoji
      ? 1
      : 0

    return reactions.reduce(
      (accumulator, currentValue) => accumulator + currentValue.count,
      initialValue,
    )
  }

  getReactionCountByProposal = (
    reaction: {emojiId: string; count: number},
    pickedEmoji: string | null,
    wasInitialPickedEmojiId: string | null,
  ) => {
    const initialValue =
      wasInitialPickedEmojiId === reaction.emojiId
        ? !!pickedEmoji && pickedEmoji === reaction.emojiId
          ? 0
          : -1
        : !!pickedEmoji && pickedEmoji === reaction.emojiId
        ? 1
        : 0

    return reaction.count + initialValue
  }
}

export default new EmojiReactionsStore()
