import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import {Http} from '@angular/http';

/**
 * Generated class for the EditnewcustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editnewcustomer',
  templateUrl: 'editnewcustomer.html',
})
export class EditnewcustomerPage {
  customer = {
    customerID:"",
    customerName:"",
    customerTel:"",
    customerMail:""
  };
  data: any=0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private alertCtrl: AlertController,private httpclient: HttpClient) {
    let customerID=this.navParams.get('customerID');
    let url = "http://localhost:8080/customer/" + customerID;
    console.log(url);
    this.http.get(url)
    .map(res=>res.json())
    .subscribe(data => {
      this.customer = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditnewcustomerPage');
  }
  editCustomer(){
    let customerID=this.navParams.get('customerID');
    let url = "http://localhost:8080/customer/" + customerID;
    console.log(this.customer);
    this.httpclient.post(url, this.customer)
      .subscribe(
        res=>{
            this.data = res;
            if(this.data.msg==true){
              this.showAlert("Success","Data added");
              this.navCtrl.popToRoot();
            }
        }
      ); 
  }
  showAlert(msgTitle:string,message:string){
    const alert = this.alertCtrl.create({
      title: msgTitle,
      subTitle: message,
      buttons: ["OK"]
    });
    alert.present();
  }

}
