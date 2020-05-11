import { get, post, put, url,} from '../axios/ApiDecorator'

class MessageManage {

  @url('/oaApi/infoRelease/addRelease')
  @get
  addMessage(){}

  @url("/oaApi/infoRelease/createReleaseNum")
  @get
  getReleaseCode(){}
}

export default new MessageManage()

