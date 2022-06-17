import { Component, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, delay, withLatestFrom } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  @HostListener('window:online',['$event'])
  IsOnline(event:any){ 
    this.toastr.success('The internet has been successfully restored ' , 'Success');
   }
  
  @HostListener('window:offline',['$event'])
  IsOffline(event:any){
    window.location.reload();
    this.router.navigateByUrl("/login");
    this.toastr.error('Please make sure you have internet ' , 'No Internet');
   }
  //#endregion
  
  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map(v => v[1]),
  );
  
  constructor(@Inject(PLATFORM_ID) 
              private platformId: Object,
              private loader: LoadingBarService,
               translate: TranslateService,
               private toastr:ToastrService,
               private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      translate.setDefaultLang('en');
      translate.addLangs(['en', 'de', 'es', 'fr', 'pt', 'cn', 'ae']);
    }
  }

}
