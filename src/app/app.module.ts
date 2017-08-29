import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TemporizadorProvider } from '../providers/temporizador/temporizador';
import {IonicStorageModule} from "@ionic/storage";
import {ModalAddTemporizadorPage} from "../pages/home/add/add.modal";
import {ModalEditTemporizadorPage} from "../pages/home/edit/edit.modal";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalAddTemporizadorPage,
    ModalEditTemporizadorPage
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
    TemporizadorProvider
  ]
})
export class AppModule {}
