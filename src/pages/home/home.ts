import {Component} from '@angular/core';
import {AlertController, ModalController, NavController} from 'ionic-angular';
import {TemporizadorProvider} from "../../providers/temporizador/temporizador";
import Temporizador from "../../models/temporizador.model";
import {ModalAddTemporizadorPage} from "./add/add.modal";
import {ModalEditTemporizadorPage} from "./edit/edit.modal";

import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/timer';
import {Subscription} from "rxjs/Subscription";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {isUndefined} from "ionic-angular/util/util";
import {Vibration} from "@ionic-native/vibration";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  temporizadores: Array<Temporizador>;
  temporizador: Temporizador;
  tiempoActual: number;
  private subscription: Subscription;
  pause: boolean;

  constructor(public navCtrl: NavController, private temporizadorProvider: TemporizadorProvider, private modalCtrl: ModalController, public alertCtrl: AlertController, private localNotifications: LocalNotifications, private vibration: Vibration) {
    this.temporizadores = [];
    this.tiempoActual = -1;
    this.temporizador = new Temporizador;
    this.pause = true;
  }

  ionViewWillEnter() {
    this.refrescarLista();
  }

  private refrescarLista() {
    this.temporizadorProvider.obtener().then(value => {
      this.temporizadores = value ? value : [];
      console.log(this.temporizadores);
    });
  }

  agregar() {
    let modal = this.modalCtrl.create(ModalAddTemporizadorPage, {
      agregar: this._agregar
    });
    modal.present();
  }

  editar(temporizador: Temporizador) {
    let modal = this.modalCtrl.create(ModalEditTemporizadorPage, {
      editar: this._editar,
      temporizador: temporizador
    });
    modal.present();
  }

  borrar(id: string) {
    let confirm = this.alertCtrl.create({
      title: 'Borrar Temporizador',
      message: 'Esta seguro?',
      buttons: [
        {
          text: 'No',
          handler: () => {

          }
        },
        {
          text: 'Si',
          handler: () => {
            this.temporizadorProvider.borrar(id).then(_ => {
              this.refrescarLista();
            });
          }
        }
      ]
    });
    confirm.present();
  }

  private _agregar = temporizador => {
    this.temporizadorProvider.agregar(temporizador).then(_ => {
      this.refrescarLista();
    });
  };

  private _editar = temporizador => {
    this.temporizadorProvider.editar(temporizador).then(_ => {
      this.refrescarLista();
    });
  };

  private cadaSegundo = e => {
    if (--this.tiempoActual == 0) {
      this.pause = true;
      this.subscription.unsubscribe();
      this.vibration.vibrate(1000);
      this.localNotifications.schedule({
        id: 1,
        text: `${this.temporizador.nombre} a Terminado!`,
      });
    }
  };

  ejecutar(temporizador: Temporizador) {
    if (!isUndefined(this.subscription)) this.subscription.unsubscribe();
    this.pause = false;

    this.temporizador = temporizador;
    this.tiempoActual = HomePage.getSeconds(temporizador.tiempo);

    console.log(this.tiempoActual);

    let timer = Observable.timer(0, 1000);
    this.subscription = timer.subscribe(this.cadaSegundo);
  }

  pausar() {
    this.pause = true;
    this.subscription.unsubscribe();
  }

  reanudar() {
    this.pause = false;
    let timer = Observable.timer(0, 1000);
    this.subscription = timer.subscribe(this.cadaSegundo);
  }

  refrescar() {
    this.tiempoActual = HomePage.getSeconds(this.temporizador.tiempo);
  }

  private static getSeconds(time) {
    let ts = time.split(':');
    return Date.UTC(1970, 0, 1, ts[0], ts[1], ts[2]) / 1000;
  }
}
