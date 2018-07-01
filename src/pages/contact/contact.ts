import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(
    public navCtrl: NavController, 
    private emailComposer: EmailComposer, 
    private callNumber: CallNumber
  ) {}

  onEmailSend(form: NgForm) {
      this.emailComposer.isAvailable().then((available: boolean) =>{
        if(available) {
          //Now we know we can send
          console.log(available);
        }
        let email = {
          to: 'sheldoneinsestein@gmail.com',
          subject: form.value.motivo,
          body: form.value.date + form.value.dolencia,
          isHtml: true
        };
        
        // Send a text message using default options
        this.emailComposer.open(email);
       });
  }

  callFromContact() {
    if (this.callNumber.isCallSupported) {
      this.callNumber.callNumber("13059105202", true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    }
    console.log('Your call could not be completed!');
  }
}


