import { Component, OnInit, Inject, AfterViewChecked,ChangeDetectorRef  } from '@angular/core';
import {Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event} from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { UserService } from './shared/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked{
  title = 'app';
  showSpinner = true;
  cssUrlCustom: string;
  cssUrlMain: string;
  // Inject the Angular Router
  stylesArLoaded: boolean = false;
  stylesEnLoaded: boolean = true;


  ngOnInit(){

  }

  constructor(private _router: Router,@Inject(DOCUMENT) private document,private cdRef: ChangeDetectorRef,
  private userService:UserService) {
    // Subscribe to the router events observable
    this._router.events.subscribe((routerEvent: Event) => {

      // On NavigationStart, set showLoadingIndicator to ture
      if (routerEvent instanceof NavigationStart) {
        this.showSpinner = true;
      }

      // On NavigationEnd or NavigationError or NavigationCancel
      // set showLoadingIndicator to false
      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationError ||
        routerEvent instanceof NavigationCancel) {
        this.showSpinner = false;
      }
    });

      
}

setLanguage(lang:string){
  if(lang =="AR")
  { 
  this.stylesArLoaded = true;
  this.stylesEnLoaded = false;
  }
  else
  {
     this.stylesArLoaded = false;
    this.stylesEnLoaded = true;
  }
}

logOut()
{
this.userService.logout();
this._router.navigate(['/login']);
}

ngAfterViewChecked() {
 
  this.cdRef.detectChanges();
}

}
