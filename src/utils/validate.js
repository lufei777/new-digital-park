// 校验手机号
export const validatePhoneNumber = (rule, value, callback) => {
  let reg = /^1[3|4|5|7|8]\d{9}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的电话号码"));
  }
}

// 校验身份证
export const validateIdCard = (rule, value, callback) => {
  let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的身份证号"));
  }
};

// 校验特殊字符
export const validateSpecialWord = (rule, value, callback) => {
  const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
    regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
  if (regEn.test(value) || regCn.test(value)) {
    callback(new Error("名称不能包含特殊字符"))
  } else {
    callback();
  }
};

// 校验邮箱
export const validMail = (rule, value, callback) => {
  let reg = /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的邮箱"));
  }
};

// 验证非中文
export const validNotChinese = (rule, value, callback) => {
  if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
    callback(new Error("不能含有中文"))
  } else {
    callback();
  }
}

// 只能是纯数字
export const valiNumber = (rule, value, callback) =>{
  let reg = /^[0-9]*$/
  if(reg.test(value)){
    callback();
  }else{
    callback(new Error("只能填写数字"))
    
  }
}