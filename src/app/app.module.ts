import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MonitreeService as MonitreeService } from './services/monitree.service'

import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { FormsModule } from '@angular/forms';
import { MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule  } from '@angular/material';
  
// import { CdkTableModule } from '@angular/cdk/table';
  
// @NgModule({
//   exports: [
//     MatButtonModule,
//     MatDatepickerModule,
//     // MatFormFieldModule
//   ]
// })

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule 
  ],
  providers: [MonitreeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
