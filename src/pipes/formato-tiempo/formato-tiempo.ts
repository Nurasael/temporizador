import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FormatoTiempoPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'segundosHHMMSS',
})
export class FormatoTiempoPipe implements PipeTransform {
  /**
   * Toma un tiempo en segundo y lo formatea a HH:mm:ss
   */
  transform(value: number, ...args) {
    return new Date(value * 1000).toISOString().substr(11, 8);
  }
}
