import {get, post, url} from '../axios/ApiDecorator'

class EnergyApi {

  @url('/vibe-web/energy/energy_elecandwater')
  @get
  getEnergyOverView(){}

  @url('/vibe-web/energy/energy_allRank')
  @get
  getEnergyRanking(){}

  @url('/vibe-web/energyCount/energy/energy_fenshiTu')
  @get
  getTimeEnergyChart(){}

  @url('/vibe-web/energyCount/energy/energy_fenshiBiao')
  @get
  getTimeEnergyTable(){}

  @url('/vibe-web/energyCount/energy/energy_fenxiangTu')
  @get
  getCategoryEnergyChart(){}

  @url('/vibe-web/energyCount/energy/energy_fenxiangBiao')
  @get
  getCategoryEnergyTable(){}

}

export default new EnergyApi()
