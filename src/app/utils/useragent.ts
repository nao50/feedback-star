export default class UserAgentUtil {
  constructor(
  ) { }

  public static getOS(): string {
    return 'TODO';
  }

  public static getDevice(): string {
    const agent = window.navigator.userAgent.toLowerCase();
    if (agent.indexOf('mac os x') > -1) {
      return 'macOS';
    } else if (agent.indexOf('iphone') > -1) {
      return 'iphone';
    } else if (agent.indexOf('ipad') > -1) {
      return 'ipad';
    } else if (agent.indexOf('android') > -1) {
      return 'android';
    } else if (agent.indexOf('windows') > -1 && agent.indexOf('phone') > -1) {
      return 'windowsphone';
    } else if (agent.indexOf('windows nt') > -1) {
      return 'windows';
    } else {
      return 'unkwon';
    }
  }

  public static getBrowser(): string {
    const agent = window.navigator.userAgent.toLowerCase();
    const version = window.navigator.appVersion.toLowerCase();
    if (agent.indexOf('msie') > -1) {
      if (version.indexOf('msie 6.') > -1) {
        return 'IE6';
      } else if (version.indexOf('msie 7.') > -1) {
        return 'IE7';
      } else if (version.indexOf('msie 8.') > -1) {
        return 'IE8';
      } else if (version.indexOf('msie 9.') > -1) {
        return 'IE9';
      } else if (version.indexOf('msie 10.') > -1) {
        return 'IE10';
      } else {
        return 'IE(バージョン不明)';
      }
    } else if (agent.indexOf('trident/7') > -1) {
      return 'IE11';
    } else if (agent.indexOf('edge') > -1) {
      return 'Edge';
    } else if (agent.indexOf('chrome') > -1) {
      return 'Chrome';
    } else if (agent.indexOf('safari') > -1) {
      return 'Safari';
    } else if (agent.indexOf('opera') > -1) {
      return 'Opera';
    } else if (agent.indexOf('firefox') > -1) {
      return 'Firefox';
    }

  }

  public static getLanguage(): string {
    return (window.navigator.languages && window.navigator.languages[0]) ||
      window.navigator.language ;
      // || window.navigator.userLanguage || window.navigator.browserLanguage;
  }

}
