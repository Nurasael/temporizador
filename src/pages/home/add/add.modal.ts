import { Component } from "@angular/core";
import Temporizador from "../../../models/temporizador.model";
import {ViewController, Platform, NavParams} from "ionic-angular";
import { UUID } from "angular2-uuid";

@Component({
  templateUrl: 'add.modal.html'
})
export class ModalAddTemporizadorPage {
  private temporizador: Temporizador;

  constructor(private viewCtrl: ViewController, public platform: Platform,  private params: NavParams) {
    this.temporizador = {
      id: UUID.UUID(),
      nombre: '',
      tiempo: '00:00:00'
    };

  }

  done() {
    let agregar = this.params.get("agregar");
    agregar(this.temporizador);
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
