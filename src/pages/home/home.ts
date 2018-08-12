import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, Platform, Slides } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { LocationPage } from '../location/location';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('slides') slides: Slides;

  clinicContact: Contact;
  currentPlatform: string;
  carouselImg: string[] = [
    '../../assets/imgs/concordancia.png',
    '../../assets/imgs/labios-BN-small.png',
    '../../assets/imgs/men.png',
    '../../assets/imgs/perfect.png',
    '../../assets/imgs/sombrerito.png'
  ]

  constructor(
    public navCtrl: NavController, 
    private callNumber: CallNumber, 
    private menuCtrl: MenuController,
    private contacts: Contacts,
    private platform: Platform
  ) {
    
  }

  ionViewWillEnter() {
    console.log(this.platform.platforms());
    if (this.platform.is('core')) {
      this.currentPlatform = 'core';
    } else if (this.platform.is('ios')) {
      this.currentPlatform = 'not core';
    }
    console.log(this.currentPlatform);
  }

  callClinic() {
    if (this.callNumber.isCallSupported) {
    this.callNumber.callNumber("13059105202", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
    }
    console.log('Your call could not be completed!');
  }

  addContact() {
    this.clinicContact = this.contacts.create();
    this.clinicContact.name = new ContactName(null, 'Dental', 'Clinic');
    this.clinicContact.phoneNumbers = [new ContactField('home', '13059105202', false)];
    this.clinicContact.save().then(res => {
      console.log(res);
    });
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
