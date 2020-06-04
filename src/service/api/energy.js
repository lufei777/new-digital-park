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
  
  @url('/vibe-web/energyCount/energy/elec')
  @get
  getEnergySavingElec(){}

  @url('/vibe-web/energyCount/energy/night')
  @get
  getEnergySavingNight(){}

  @url("/vibe-web/getEnergyModule")
  @get
  getEnergyModuleData(){}

  @url("/vibe-web/reckon/getSpaceTree")
  @get
  getSpaceStandardTree(){}

  @url("/vibe-web/reckon/insertOrUpdateValue")
  @post
  setStandardValue(){}
}

export default new EnergyApi()
