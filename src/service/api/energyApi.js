import {get, post, url} from '../axios/ApiDecorator'

class EnergyApi {

  @url('/vibe-web/energy/energy_elecandwater')
  @get
  getEnergyOverView(){}

}

export default new EnergyApi()
