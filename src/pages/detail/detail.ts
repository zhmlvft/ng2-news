import {Component} from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  newsid:number;
  newstitle:string;
  newslink: string;
  constructor(public nav: NavController,navParams:NavParams) {
    this.newsid = navParams.get("newsid");
    this.newstitle = navParams.get("newstitle");
    this.newslink = navParams.get("newslink");
  }
  // ionViewWillEnter() {
  //   let tabs = document.querySelectorAll('.tabbar');
  //   if ( tabs !== null ) {
  //     Object.keys(tabs).map((key) => {
  //       tabs[ key ].style.transform = 'translateY(56px)';
  //     });
  //   } // end if
  // }
  //
  // ionViewDidLeave() {
  //   let tabs = document.querySelectorAll('.tabbar');
  //   if ( tabs !== null ) {
  //     Object.keys(tabs).map((key) => {
  //       tabs[ key ].style.transform = 'translateY(0)';
  //     });
  //   } // end if
  // }
}
