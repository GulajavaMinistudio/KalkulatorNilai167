import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthBrowserTipeService } from './auth-browser-tipe.service';

@Injectable()
export class ChromeBrowserGuardGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authBrowserService: AuthBrowserTipeService, private router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const urlBrowser: string = state.url;
    return this.cekBrowserChrome(urlBrowser);
  }


  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }

  /**
   * @description Ijinkan mengakses isi halaman jika bersifat lazy loading
   * @param {Route} route
   * @return {Observable<boolean> | Promise<boolean> | boolean}
   */
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {

    const urlBrowser = `/${route.path}`;
    const isBrowserSupport = this.cekBrowserChrome(urlBrowser);

    if (isBrowserSupport) {
      this.router.navigate([urlBrowser]);
    } else {
      // Navigasi ke halaman untuk download browser Google Chrome
      this.router.navigate(['/lebih-lancar-pake-chrome']);
    }
    return true;
  }

  cekBrowserChrome(stringurl: string): boolean {

    this.authBrowserService.checkBrowserDetection();

    if (!this.authBrowserService.isBrowserSupport) {
      // Store the attempted URL for redirecting
      this.authBrowserService.stringRedirectUrl = stringurl;
      this.router.navigate(['/lebih-lancar-pake-chrome']);
    }
    return true;
  }
}
