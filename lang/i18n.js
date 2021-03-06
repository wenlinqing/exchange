module.exports = {
  locale: 'zh', // 默认选择的语言
  locales: {},
  registerLocale (locales) {
    this.locales = locales
  },
  setLocale (code) {
    this.locale = code
    uni.setStorageSync("languageKey",code)
  },
  getLanguage(){
    //return this.locales[this.locale];
    this.locale = uni.getStorageSync("languageKey") || this.locale
    return this.locales[this.locale];
  },
  /**
   * 返回带（或不带）参数的类型的翻译结果
   * @param {string} key, /util/language/en.js 中的键名，如 "curslide"
   * @param {object} data, 传入的参数，如 {num: 123}
   * @returns {string}
   *
   * @desc 如："activeno": "当前学生{activeno}位",
   *       activeno 为 key，可以输入data {activeno: 15}
   *       返回："当前学生15位"
   */
  _ (key, data) {
    let locale = this.locale
    let locales = this.locales
    if (locale && locales[locale] && locales[locale][key]) {
      key = locales[locale][key]
    }

    return key
  },
  /**
   * 返回二选一类型的翻译结果
   * @param {string} key, /util/language/en.js 中的键名，如 "curslide"
   * @param {object} data, 传入的参数，如 {first: true} 选择前面的
   * @returns {string}
   *
   * @desc 如："sendprob": "Send | Check",
   *       sendprob 为 key，可以输入data {first: true}
   *       返回："Send"
   */
  _b (key, data) {
    let locale = this.locale
    let locales = this.locales
    let hasKey = locale && locales[locale] && locales[locale][key]
    
    if (hasKey) {
      key = locales[locale][key]

      let res = key.split('|')[data.first ? 0 : 1].trim()

      return res
    }
    throw new Error(`语言处理错误${key}`)
  }
}
