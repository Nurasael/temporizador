import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import {IonicStorageModule} from "@ionic/storage";
import {LocalNotifications} from '@ionic-native/local-notifications'
import { Vibration } from '@ionic-native/vibration';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TemporizadorProvider } from '../providers/temporizador/temporizador';
import {ModalAddTemporizadorPage} from "../pages/home/add/add.modal";
import {ModalEditTemporizadorPage} from "../pages/home/edit/edit.modal";
import {FormatoTiempoPipe} from "../pipes/formato-tiempo/formato-tiempo";
import {FormatoASegundosPipe} from "../pipes/formato-a-segundos/formato-a-segundos";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalAddTemporizadorPage,
    ModalEditTemporizadorPage,
    FormatoTiempoPipe,
    FormatoASegundosPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalAddTemporizadorPage,
    ModalEditTemporizadorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TemporizadorProvider,
    LocalNotifications,
    Vibration
  ]
})
export class AppModule {}
