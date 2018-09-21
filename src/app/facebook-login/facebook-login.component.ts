import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.css']
})
export class FacebookLoginComponent  {

  private authWindow: Window;
  failed: boolean;
  error: string;
  errorDescription: string;
  isRequesting: boolean; 

  launchFbLogin() {
    this.authWindow = window.open('https://www.facebook.com/v3.1/dialog/oauth?&response_type=token&display=popup&client_id=335058893898026&display=popup&redirect_uri=http://localhost:4200/facebook-auth.html#scope=email',null,'width=600,height=400');    
  }

  constructor(private userService: UserService, private router: Router) {
    if (window.addEventListener) {
      window.addEventListener("message", this.handleMessage.bind(this), false);
    } else {
       (<any>window).attachEvent("onmessage", this.handleMessage.bind(this));
    } 
  } 

  handleMessage(event: Event) {
    const message = event as MessageEvent;
    // Only trust messages from the below origin.
    if (message.origin !== "http://localhost:4200") return;

    // for first time window undifinde
    if(this.authWindow!=undefined)
    {
    this.authWindow.close();
    
    const result = JSON.parse(message.data);
    if (!result.status)
    {
      this.failed = true;
      this.error = result.error;
      this.errorDescription = result.errorDescription;
    }
    else
    {
      this.failed = false;
      this.isRequesting = true;

      this.userService.facebookLogin(result.accessToken)
        .pipe(finalize(() => this.isRequesting = false))
        .subscribe(
        result => {
          if (result) {
            this.router.navigate(['/dashboard']);
          }
        },
        error => {
          this.failed = true;
          this.error = error;
        });      
    }
  }
  }
}