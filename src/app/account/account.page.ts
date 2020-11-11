import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { RestService } from '../Service/rest.service';
import { Register } from '../Model/class';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  fullname;
  number;
  bean;
  profilephoto;
  errmsg:boolean=false;
  array;
  role;
  userid;
  arr;
  name;
  selectedFile: FileList;
  currentFileUpload: File;
  ar;
  admin: boolean = false;
user: boolean = false;
base:string="assets/icon/user-avatar.png";
profilePhoto;
  public data: Register = new Register();
  constructor(private route:Router,public alertController: AlertController,
    private myRoute: Router,
    public rest: RestService) { }

  ngOnInit() {
    this.getuserprofiles();
  }
  doRefresh(event) {
this.getuserprofiles();
console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  goto(){
    this.route.navigate(['/dashboard/edit-profile']);
  }
 
  async logout() {
    this.alertController.create({
      header: 'Confirm Alert',
     mode:'md',
      message: 'Are you sure? you want to logout',
      buttons: [
       
        {
          text: 'okay',
          handler: () => {
            this.rest.logout();
            this.myRoute.navigate(['/login']);
           console.log('Loggedout');
          }
        },
       
      ]
    }).then(res => {
      res.present();
    });
  }
  
  getuserprofiles() {
    this.rest.userprofile().subscribe((result) => {
      console.log(result);
    if (result === undefined) {
        console.log(result);
        this.errmsg = true;
      }
      else {
        /* to get userdetails */
        this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
        this.userid = this.arr[1].value;
        this.rest.sendId(this.userid.id);
        this.name = this.userid.fullname;
       console.log(this.userid.name);
        this.number = this.userid.number;
      console.log(this.userid.number);
      this.profilePhoto = "http://localhost:3000/"+this.userid.profilephoto;
      // this.bean = this.userid.profilephoto;
      // console.log(this.userid.profilephoto);
        /* to get role of user */
        this.ar = Object.entries(this.userid.roles).map(([type, value]) => ({ type, value }));
        this.role = this.ar[0].value;
        this.rest.sendRole(this.role.name);
        /* Role Differntiation */
        if (this.rest.getRole() == "ADMIN") {
          this.admin=true;
        }
        else {
        this.user=true;
        }
      }
    }, (err) => {
      console.log(err);
    });
  }
}
