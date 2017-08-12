import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

//Imports Used by Angular Material
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialGlobalsModule } from './material.globals.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';

//Parts
import { ListTabsPart } from './parts/list-tabs/list-tabs.part';

//Views
import { LoginViewComponent } from './views/login/login.view.component';
import { ListTestViewComponent } from './views/list-test/list-test.view.component';

//Angular Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

//Routes
const routes :Routes = [
  { path:"", component: ListTabsPart },
  { path:"authenticate", component: LoginViewComponent },
  { path:"list-test", component: ListTestViewComponent },
  { path:"form-test", component: CreditCardForm}
]

@NgModule({
  declarations: [
    AppComponent,
    ListTabsPart,
    LoginViewComponent,
    ListTestViewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
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
