import {Component} from '@angular/core';
import {AlertController, ModalController, NavController} from 'ionic-angular';
import {TemporizadorProvider} from "../../providers/temporizador/temporizador";
import Temporizador from "../../models/temporizador.model";
import {ModalAddTemporizadorPage} from "./add/add.modal";
import {ModalEditTemporizadorPage} from "./edit/edit.modal";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  temporizadores: Array<Temporizador>;

  constructor(public navCtrl: NavController, private temporizadorProvider: TemporizadorProvider, private modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.temporizadores = [];
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

  ejecutar(temporizador: Temporizador) {

  }
}
