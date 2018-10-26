import { Component, AfterViewInit,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../service/data.service";
import { DropDowns } from '../model/dropdowns.model';
import { Totalcount } from '../model/totalcount.model';
import * as Prism from 'prismjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  
  accounts: DropDowns[]; 
  campaigns: DropDowns[];
  filterForm: FormGroup;
  submitted = false; 
  totalhcp: Array<Object> = [ {tot_hcp: 0} ];
  totalemailsent: Array<Object> = [ {tot_sent: 0} ];
  totalemailopen: Array<Object> = [ {tot_open: 0} ];
  totalemailclick: Array<Object> = [ {tot_engage: 0} ];
  totalassetclick: Array<Object> = [ {tot_inter: 0} ]; 
   

  selectedAccount = 0;
  selectedCampaign = 0;
  acc_id:number = 0;
  campaign_id:number = 0;
  campaign:any[];
  

  constructor(private dataService: DataService,private formBuilder:FormBuilder){

    
  	
  }
  
   /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    Prism.highlightAll();
  }

  ngOnInit() {
    //console.log(this.acc_id);
    this.getAccounts(); 
    this.getTotalHcps(this.acc_id,this.campaign_id);
    this.getTotalEmailsSent(this.acc_id,this.campaign_id);
    this.getTotalEmailsOpen(this.acc_id,this.campaign_id);
    this.getTotalEmailsClick(this.acc_id,this.campaign_id);
    this.getTotalAssetsClick(this.acc_id,this.campaign_id);
    
    this.filterForm = this.formBuilder.group({
      account_id:[ '', Validators.required ],
      campaign_id:[ '', Validators.required ],
    });

  }

  onSubmit(){
    this.submitted = true;
    if (this.filterForm.invalid) {
       return; 
    }
    this.acc_id = this.filterForm.value.account_id;
    this.campaign_id = this.filterForm.value.campaign_id;
    //console.log(this.filterForm.value.account_id);
    this.getTotalHcps(this.acc_id,this.campaign_id);
    this.getTotalEmailsSent(this.acc_id,this.campaign_id);
    this.getTotalEmailsOpen(this.acc_id,this.campaign_id);
    this.getTotalEmailsClick(this.acc_id,this.campaign_id);
    this.getTotalAssetsClick(this.acc_id,this.campaign_id);
  }

  onSelectAccount(acc_id: number) {
    this.selectedAccount = acc_id;
    this.selectedCampaign = 0; 
    if(acc_id != 0 ){
      this.campaigns = this.getCampaigns(acc_id);
    }else{
      //this.campaigns = 0;
    }
   /* this.states = this.getCampaigns().filter((item) => {
      return item.country_id === Number(country_id)
    });*/
  }

 
  getAccounts() {
     this.dataService.getAccountDetails()
      .subscribe( data => {
        this.accounts = data;
      });
  }
  
 getCampaigns(acc_id:number): any{
   this.dataService.getCampaignDetails(acc_id)
      .subscribe( data => {
         this.campaigns = data;
      });
  }	

  getTotalHcps(acc_id:number,campaign_id:number) {
    this.dataService.getTotalHcp(acc_id,campaign_id)
     .subscribe( data => {
       this.totalhcp = data[0];
     });
     
 }

 getTotalEmailsSent(acc_id:number,campaign_id:number) {
  this.dataService.getTotalEmailSent(this.acc_id,this.campaign_id)
   .subscribe( data => {
     this.totalemailsent = data[0];
   });
   
}

getTotalEmailsOpen(acc_id:number,campaign_id:number) {
  this.dataService.getTotalEmailOpen(this.acc_id,this.campaign_id)
   .subscribe( data => {
     this.totalemailopen = data[0];
   });
   
}


getTotalEmailsClick(acc_id:number,campaign_id:number) {
  this.dataService.getTotalEmailClick(this.acc_id,this.campaign_id)
   .subscribe( data => {
     this.totalemailclick = data[0];
   });
   
}


getTotalAssetsClick(acc_id:number,campaign_id:number) {
  this.dataService.getTotalAssetClick(this.acc_id,this.campaign_id)
   .subscribe( data => {
     this.totalassetclick = data[0];
   });
   
}


  isEmpty(value){
    if(value != null || value.length != 0 || typeof value !== 'undefined'){
      return value;
    }else{
      return value=0;
    }
  }

  
}
