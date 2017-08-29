import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import Temporizador from "../../models/temporizador.model";
import {Storage} from "@ionic/storage";

/*
  Generated class for the TemporizadorProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TemporizadorProvider {
  private name = "Temporizadores";

  constructor(private storage: Storage) {

  }

  agregar(item: Temporizador): Promise<any> {
    return this.storage.get(this.name).then(value => {
      let items = value ? value : [];
      items.push(item);
      return this.storage.set(this.name, items);
    });
  }

  editar(item: Temporizador): Promise<any> {
    return this.storage.get(this.name).then(value => {
      let items = value ? value : [];
      items = items.map(e => e.id === item.id ? item : e);
      return this.storage.set(this.name, items);
    });
  }

  obtener(): Promise<any> {
    return this.storage.get(this.name);
  }

  borrar(id: string): Promise<any> {
    return this.storage.get(this.name).then(value => {
      let items = value ? value : [];
      items = items.filter(e => e.id !== id);
      return this.storage.set(this.name, items);
    });
  }
}

