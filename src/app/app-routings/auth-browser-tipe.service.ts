import { Injectable } from '@angular/core';

@Injectable()
export class AuthBrowserTipeService {

  isBrowserSupport = false;
  stringRedirectUrl: string;

  constructor() {
  }

  checkBrowserDetection() {

    this.isBrowserSupport = this.isBrowserSupportBener();
  }

  isBrowserSupportBener(): boolean {

    let isBrowserOke = false;

    const isChromeChromium = /chrome\s|chromium\/|chrome\//i.test(window.navigator.userAgent);
    const isBlinkEngineOpera = /blink\s|opr\/|opera\//i.test(window.navigator.userAgent);
    if (isChromeChromium || isBlinkEngineOpera) {
      isBrowserOke = true;
    }
    console.log(window.navigator.userAgent + ' ' + isBrowserOke);

    return isBrowserOke;
  }
}
