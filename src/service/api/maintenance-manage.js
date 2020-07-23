import { get, post, url , patch} from '../axios/ApiDecorator'

class maintenanceManage {
    @url('/oaApi/repairs')
    @get
    getRepairs() { }

    @url('/oaApi/repair')
    @post
    addRepairs() { }

    @url('/oaApi/repair')
    @get
    detailRepairs() { }

    @url('/oaApi/repair')
    @patch
    updateRepairs() { }

    @url('/oaApi/repair/profession')
    @patch
    dispatch() { }
    
    @url('/oaApi/repair')
    @patch
    backRepair() { }

    @url('/oaApi/repair/finish')
    @patch
    finishTask() { }
}

export default new maintenanceManage()
