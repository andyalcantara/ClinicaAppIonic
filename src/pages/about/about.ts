import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Especialidad } from '../../models/especialidad';

import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  items: Especialidad[] = [
    {title: 'Blanqueamiento', especialidad: 'El blanqueamiento dental es un procedimiento clinico que trata de conseguir el aclaramiento del color de los dientes. En nuestra clinica contamos con avanzadas tecnicas para que puedas recuperar el color de tus dientes y presumas de una bonita sonrisa.', index: 0, active: false},
    {title: 'Protesis', especialidad: 'La protesis bucal es una rama de la odontologia que se encarga de la rehabilitacion de las funciones orales, recuperando tu sonrisa y comodidad, con la realizacion adecuado tratamiento protesico. Ven a nuestra clinica y te brindaremos las mejores soluciones para que vuelva a gozar de una sonrisa perfecta', index: 1, active: false},
    {title: 'Implantes', especialidad: 'Los implantes dentales se han considerado una forma efectiva para remplazar los dientes perdidos, cada dia el numero de personas que lo utilizan aumenta. Por lo que en nuestra clinica contamos con variedad de implantes y personal cualificado en el tratamiento', index: 2, active: false},
    {title: 'Ortodoncia', especialidad: 'Unete al club de las sonrisas perfectas!! Con nuestros tratamientos eliminaremos problemas de maloclusion y apinamiento de forma rapida y comoda. Especialistas en ortodoncia avanzada realizaran un plan de tratamiento que se ajuste a sus necesidades.', index: 3, active: false},
    {title: 'Endodoncia', especialidad: 'Con estos tratamientos nuestros expertos pretenden alargar la vida de tus dientes, dandote una solucion inmediata y definitiva al dolor dentario mediante el diagnostico y tratamiento de las enfermedades de origen pulpar.', index: 4, active: false},
    {title: 'Periodoncia', especialidad: 'Esta relacionada con los tejidos que sostienen y protegen a nuestros dientes, una incorrecta higiene dental estimula la aparicion de estas enfermadades. En nuestra clinica contamos con tratamientos que pueden ayudar a eliminar tan indeseados problemas, porque tu sonrisa cuenta. Visitanos!!', index: 5, active: false}
  ];
  
  constructor(
    public navCtrl: NavController,
    private callNumber: CallNumber
  ) {

  }

  itemSelected( item: Especialidad) {
    item.active = !item.active;
  }

  callFromEspec() {
    if (this.callNumber.isCallSupported) {
      this.callNumber.callNumber("13059105202", true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    }
  }
}
