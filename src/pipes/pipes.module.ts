import { NgModule } from '@angular/core';
import { FormatoTiempoPipe } from './formato-tiempo/formato-tiempo';
import { FormatoASegundosPipe } from './formato-a-segundos/formato-a-segundos';
@NgModule({
	declarations: [FormatoTiempoPipe,
    FormatoASegundosPipe],
	imports: [],
	exports: [FormatoTiempoPipe,
    FormatoASegundosPipe]
})
export class PipesModule {}
