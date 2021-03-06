import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { NewcustomerPage} from '../newcustomer/newcustomer';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { EditnewcustomerPage } from '../editnewcustomer/editnewcustomer';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  customer:any=0;
  data:any=0;
  constructor(public navCtrl: NavController,public navParam: NavParams, public http: Http,private alertCtrl : AlertController) {
    this.getData();
  }
  showDetail(id)
  {
    this.navCtrl.push(DetailPage,{customerID :id});
  }
  editnewcustomer(id)
  {
    this.navCtrl.push(EditnewcustomerPage,{customerID :id});
  }
  showNewcustomer()
  {
    this.navCtrl.push(NewcustomerPage);
  }  
  //แสดงข้อมูลเมื่อเปิดมาสู่หน้าครั้งแรก
  getData(){
    this.http.get('http://localhost:8080/customer')
    .map(res => res.json()).subscribe(data => {this.customer= data});
  }
  //แสดงข้อมูลเมื่อไปหน้าอื่นแล้วกลับมาสู่หน้า Home
  ionViewWillEnter(){
    this.getData();
  }
  deleteData(customerID){
    this.alertCtrl.create({
      title:"Confirm", subTitle:"Confirm delete",buttons:[
        { 
          text: "Yes",
          handler:()=>{
            let url ="http://localhost:8080/customer/"+customerID;
            console.log(url);
            this.http.delete(url)
              .subscribe(res=>{
                this.data=res;
                console.log(this.data);
                  this.showAlert("Success", "Data deleted");
                  this.getData();
              }); 
          }
        },
        {
          text: "No",
          handler:()=>{}
        }
      ]
    })
      .present();
   
  }

  showAlert(msgTitle:string, message:string){
    const alert = this.alertCtrl.create({
      title: msgTitle,
      subTitle: message,
      buttons: ["OK"]
    });
    //show alert
    alert.present();
}

}