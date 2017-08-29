import { Component } from "@angular/core";
import Temporizador from "../../../models/temporizador.model";
import {ViewController, Platform, NavParams} from "ionic-angular";

@Component({
  templateUrl: 'edit.modal.html'
})
export class ModalEditTemporizadorPage {
  private temporizador: Temporizador;

  constructor(private viewCtrl: ViewController, public platform: Platform,  private params: NavParams) {
    this.temporizador = {
      id: '',
      nombre: '',
      tiempo: '00:00:00'
    };

  }

  ionViewWillEnter() {
    this.temporizador = this.params.get("temporizador");
  }

  done() {
    let editar = this.params.get("editar");
    editar(this.temporizador);
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
