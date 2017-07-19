import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

//Imports Used by Angular Material
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialGlobalsModule } from './material-globals.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';

//Parts
import { ListTabsPart } from './parts/list-tabs/list-tabs.part';

//Views
import { LoginViewComponent } from './views/login/login.view.component';

//Angular Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

const routes :Routes = [
  { path:"", component: ListTabsPart },
  { path:"authenticate", component: LoginViewComponent }
]



@NgModule({
  declarations: [
    AppComponent,
    ListTabsPart,
    LoginViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NoopAnimationsModule,
    MaterialGlobalsModule,
    AngularFireModule.initializeApp(environment.firebase, 'remedy'), 
    AngularFireDatabaseModule, 
    AngularFireAuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
