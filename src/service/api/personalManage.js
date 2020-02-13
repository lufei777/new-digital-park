import { get, post, url } from '../axios/ApiDecorator'

export default new class {
    /**
     * userId 账号id
     * messageId 人员信息id
     */

    /**字段名:字段类型:字段默认值 */
    /**
     * 查询user的账号列表
     * send     { pageNum:Number,pageSize:Number:10 }
     * back     {id:userId,messageId:messageId,...}
     */
    @url('/user-service/user/selectUsers')
    @get
    getUserAccountList() { }

    /**
     * 查询用户基本信息列表
     * send     { pageNum:Number,pageSize:Number:10,(userId:user账号id || id:user基本信息id) }
     * back     {id:messageId,userId:userId,...}
     */
    @url('/user-service/user/selectMessages')
    @get
    getUserMessageList() { }

    /**
     * 根据user_id查询基本信息
     * send     {userId:userId}
     * back     {id:...}
     */
    @url('/user-service/user/selectMessageByUserId')
    @get
    getUserMessageByUserId() { }

    /**
     * 根据message_id查询基本信息
     * send     {id:messageId}
     * back     {id:...}
     */
    @url('/user-service/user/selectMessageById')
    @get
    getUserMessage() { }

    /**
     * 新增基本信息
     * send     Object:需要新增的信息
     * back     {id:messageId，...}
     */
    @url('/user-service/user/insertMessage')
    @post
    insertUserMessage() { }

    /**
     * 删除基本信息
     * send     {id:messageId}
     */
    @url('/user-service/user/deleteMessageById')
    @post
    delUserMessage() { }

    /**
     * 修改基本信息
     * send     {id:messageId}
     * 基本信息需要修改的字段，通过message的id修改 id不能为空
     */
    @url('/user-service/user/updateMessage')
    @post
    updateUserMessage() { }

    /**
     * 根据id查询个人信息
     * send     {id:messageId}
     * back     Object
     */
    @url('/user-service/user/selectPersonByMessageId')
    @get
    getUserPersonMessage() { }

    /**
     * 根据id新增基本信息
     * send     {id:messageId}
     * back     Object
     */
    @url('/user-service/user/insertPerson')
    @post
    insertUserPersonMessage() { }

    /**
    * 根据id更新个人信息
    * send     {id:userId,messageId:messageId}
    * back     Object
    */
    @url('/user-service/user/updatePerson')
    @post
    updateUserPersonMessage() { }

    /**
    * 根据id删除个人信息
    * send     {id:userId}
    * back     Object
    */
    @url('/user-service/user/deletePersonById')
    @post
    delUserPersonMessage() { }
}