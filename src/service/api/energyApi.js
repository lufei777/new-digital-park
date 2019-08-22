import {get, post, url} from '../axios/ApiDecorator'

class EnergyApi {

  @url('/vibe-web/energy/energy_elecandwater')
  @get
  getEnergyOverView(){}

  @url('/vibe-web/energy/energy_allRank')
  @get
  getEneryRanking(){}

}

export default new EnergyApi()
