import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { LocationPage } from '../location/location';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private callNumber: CallNumber, private menuCtrl: MenuController) {

  }

  callClinic() {
    if (this.callNumber.isCallSupported) {
    this.callNumber.callNumber("13059105202", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
  console.log('Your call could not be completed!');
}

  goToAboutPage() {
    this.navCtrl.push(AboutPage);
    this.menuCtrl.close();
  }

  goToEspecPage() {
    this.navCtrl.push(ContactPage);
    this.menuCtrl.close();
  }

  goToLocationPage() {
    this.navCtrl.push(LocationPage);
    this.menuCtrl.close();
  }
}
