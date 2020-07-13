// 校验手机号
export const validatePhoneNumber = (rule, value, callback) => {
  let reg = /^1[3|4|5|7|8]\d{9}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的电话号码"));
  }
}
/^[a-zA-Z]+$/

//校验座机手机号
export const validateTelephoneNumber = (rule, value, callback) => {
  let reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
  let reg2 = /^\d{3}-\d{8}$|^\d{4}-\d{7,8}$/;
  if (reg.test(value) || reg2.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的手机号"));
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
export const valiNumber = (rule, value, callback) => {
  let reg = /^[0-9]*$/
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("只能填写数字"))

  }
}
// 中文和数字的
export const valiNUmberandWorld = (rule, value, callback) => {
  let reg = /^[\u4e00-\u9fa5_0-9]+$/
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("只支持中文和数字"))

  }
}