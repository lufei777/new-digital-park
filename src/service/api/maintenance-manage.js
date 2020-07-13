import { get, post, url } from '../axios/ApiDecorator'

class maintenanceManage {
    @url('/oaApi/repairs')
    @get
    getRepairs() { }

}

export default new maintenanceManage()
