import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { MyScanAgentServiceProvider } from './../../providers/my-scan-agent-service/my-scan-agent-service';
import { ToastController, LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  isLoggedIn : boolean = false;
  responseData : any;
  userData = {"email": "","password": "", "grant_type": "password"};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public scanAgent: MyScanAgentServiceProvider,
              public loadingCtrl: LoadingController) {
  }

  goHome(){
    this.navCtrl.setRoot(TabsPage);
  }
  login(f){
   if(f.valid){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
      this.isLoggedIn = this.scanAgent.loginAccount(f.value.email,f.value.password);
      if (this.isLoggedIn){
        loading.dismiss();
        this.navCtrl.setRoot(TabsPage);
      }
    }
 }
}
