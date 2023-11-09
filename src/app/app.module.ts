import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"tpclinica-7ca7f","appId":"1:629417419037:web:f69ce3c9de80b8329b41f4","storageBucket":"tpclinica-7ca7f.appspot.com","apiKey":"AIzaSyBcgtMdYCt8WeazV_-yxg5FJotK6VCg1H8","authDomain":"tpclinica-7ca7f.firebaseapp.com","messagingSenderId":"629417419037"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }