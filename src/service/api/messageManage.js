import { get, post, put, url,} from '../axios/ApiDecorator'

class MessageManage {

  @url('/oaApi/infoRelease/addRelease')
  @post
  addMessage(){}

  @url("/oaApi/infoRelease/createReleaseNum")
  @get
  getReleaseCode(){}

  @url("/oaApi/infoRelease/getReleaseList")
  @get
  getReleaseList(){}

  @url("/oaApi/infoRelease/editRelease")
  @post
  editMessage(){}

  @url("/oaApi/infoRelease/delRelease")
  @get
  delRelease(){}

  @url("/oaApi/infoRelease/releaseInfo")
  @get
  getMessageDetail(){}
}

export default new MessageManage()

