import { Component } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Register} from './Model/class';
import { RestService } from './Service/rest.service';
import { Router } from '@angular/router';
import { LoginPage } from './login/login.page';
//import { Network } from '@ionic-native/network/ngx';
//import { Dialogs } from '@ionic-native/dialogs/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public UserMenuItems = [
    {
      title: 'Home',
      icon: 'home',
      url:'/dashboard/home'
    },
    {
      title: 'Post Advertisement',
      icon: 'document',
      url:'/dashboard/home'
    },
    {
      title: '  Buy Package',
      icon: 'pricetag',
      url:'/dashboard/home'
    },
    {
      title: 'Notifications',
      icon: 'notifications',
      url:'/dashboard/home'
    },
   
   
    {
      title: 'Support',
      icon:'call',
      children  :[
        {
          title: 'Help Center',
          icon: 'call',
          url:'/addpro'
        },
        {
          title: 'Rate us',
          icon: 'person',
          url:'/addpro'
        },
        {
          title: 'Invite friends',
          icon: 'person',
          url:'/addpro'
        },
      ]
    },
    {
      title: 'Privacy',
      icon:'shield-checkmark',
      children  :[
        {
          title: 'Version',
          icon: 'shield-checkmark',
          url:'/addpro'
        },
        {
          title: 'Deactivate',
          icon: 'person',
          url:'/addpro'
        },
        {
          title: 'Become a Partner',
          icon: 'hand-left',
          url:'/addpro'
        },
      ]
    },
    
    
    ];
public AdminMenuItems = [
  {
    title: 'Dashboard',
    icon: 'home',
    url:'/addpro'
  },
  {
    title: 'View Users',
    icon: 'eye',
    url:'/addpro'
  },
  {
    title: 'Add Product',
    icon: 'basket',
    url:'/addpro'
  },
  {
    title: 'All Product',
    icon: 'eye',
    url:'/addpro'
  },
  {
    title: 'All Advertisement',
    icon: 'pricetags',
    url:'/addpro'
  },
  {
    title: 'Dark/Light',
    icon: 'bulb',
    url:'/addpro'
  }
  
];
  profilePhoto;
  rootPage:any = LoginPage;
  name;
  userid;
  arr;
  ar;
  role;
  shownGroup:any;
  errmsg: boolean;
  admin: boolean = false;
  user: boolean = false;
  public data: Register = new Register();
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private rest: RestService,
    private route: Router,
    private modalController:ModalController
  ) {
//     this.network.onDisconnect().subscribe(() => 
//     {
//       this.dialogs.alert('Please Connect your Internet')

//     });
//     this.network.onConnect().subscribe(() => {
// setTimeout(() =>
//  {
//   this.dialogs.alert('Connected to '+this.network.type+' connection');
// }, 2000);
//     });
    platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#27ae60');
      this.statusBar.hide();
     
      });
     
    
   
    this.initializeApp();
  }

  initializeApp() {
    this.getuserprofiles();
    this.platform.ready().then(() => {
      // if (window.location.pathname === "/"){
      //   this.route.navigateByUrl('addpro');
      // }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  doRefresh(event) {
    this.getuserprofiles();
   setTimeout(() => { 
      //console.log('Async operation has ended');
     event.target.complete();
   }, 2000);
 }






 getuserprofiles() {
  this.rest.userprofile().subscribe((result) => {
    if (result === undefined) {
      console.log(result);
      this.errmsg = true;
    }
    else {
      /* to get userdetails */
      this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
      this.userid = this.arr[1].value;
      this.name = this.userid.fullname;
      console.log(this.userid.name);
      this.profilePhoto = "http://localhost:3000/"+this.userid.profilephoto;
      console.log(this.profilePhoto);
      this.rest.sendId(this.userid.id);
    
       /* to get role of user */

      this.ar = Object.entries(this.userid.roles).map(([type, value]) => ({ type, value }));
      this.role = this.ar[0].value;
       //console.log(this.role.name);
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
  logout() {
  
    this.rest.logout();
    this.route.navigate(['/login']);
    this.admin = false;
    this.user = false;
  }
}