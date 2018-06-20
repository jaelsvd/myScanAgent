import { SearchViewModel } from './../../app/classes/SearchViewModel';
import { Details } from './../../app/classes/Details';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyScanAgentServiceProvider } from './../../providers/my-scan-agent-service/my-scan-agent-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 details : SearchViewModel[];

  constructor(public navCtrl: NavController,
    public scanAgent: MyScanAgentServiceProvider) {

  }
  getItems(items){
    console.log("cambio esta madre"+items);
  }
  ionViewOnload(){
    
  }
  async searchByKeyword(upc){
    var result = await this.scanAgent.getItems(upc).subscribe(resp => {
      this.details = resp;
      console.log("Respuesta",resp);
    });
    console.log("Home Result",result);
  }
  
}
