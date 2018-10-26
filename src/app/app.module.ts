import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { adminLteConf } from './admin-lte.conf';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from 'angular-admin-lte';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DataService } from "./service/data.service";
import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';
import { HttpClientModule } from "@angular/common/http";
import { HttpClient } from 'selenium-webdriver/http';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { Dashboard2Component } from './dashboard2/dashboard2.component';
//import { EJAngular2Module } from 'ej-angular2';

import { PageService, SortService, FilterService, GroupService,GridModule, EditService, CommandColumnService } from '@syncfusion/ej2-angular-grids';

import { RmsComponent } from './rms/rms.component';
import { ValidateAnalyzeWizardComponent } from './validate-analyze-wizard/validate-analyze-wizard.component';
import { ShareDataService } from "./service/sharedata.service"; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule,TabsModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { DropDownListModule,MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { DialogModule } from '@syncfusion/ej2-angular-popups';



@NgModule({
  
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,   
    CoreModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    LayoutModule.forRoot(adminLteConf),
    LoadingPageModule, MaterialBarModule,GridModule,BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    DialogModule,
    MultiSelectModule, 
    DropDownListModule
    
  ],


  declarations: [
    AppComponent,
    HomeComponent,
    Dashboard2Component,
    RmsComponent, 
    ValidateAnalyzeWizardComponent
  ],


  entryComponents:[ Dashboard2Component ],
  
  
  providers: [
    DataService,PageService, 
    SortService, 
    FilterService, 
    GroupService,
    CommandColumnService,
    ShareDataService
  ],
    bootstrap: [AppComponent]


})


export class AppModule {}
