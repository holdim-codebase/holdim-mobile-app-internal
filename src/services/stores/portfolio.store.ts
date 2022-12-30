import { observable, action, computed, makeObservable } from 'mobx'

import { TUser } from '../../types'

class PortfolioStore {
  portfolio: TUser | null = null

  constructor() {
    makeObservable(this, {
      portfolio: observable,
      userHasFollowedDaos: computed,
      setPortfolio: action
    });
  }


  setPortfolio = (portfolio: TUser) => {
    this.portfolio = portfolio
  }

  get userHasFollowedDaos() {
    return this.portfolio && this.portfolio.followedDaos.length > 0
  }
}

export default new PortfolioStore()
