import { Component,ViewEncapsulation,ViewChild,OnInit,ElementRef ,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../service/data.service";
import { DropDowns } from '../model/dropdowns.model';
import * as Prism from 'prismjs';
import { CommandModel, GridComponent, Column, IRow, EditSettingsModel,PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { EJComponents } from 'ej-angular2';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';  
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-dashboard2', 
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Dashboard2Component implements OnInit {
  
  

  @ViewChild('ejDialog') ejDialog: DialogComponent;
  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;
  @ViewChild('campaign')
  public campaignObj: MultiSelectComponent;
 
  @ViewChild('grid')
  public grid: GridComponent;
  
  data: Array<Object> = [];
  
  fieldsvalues: Object;
  value: string;
  
  
  public gridData: any;
  public pageSettings:PageSettingsModel;
  public toolbarSettings;
  public editSettings: EditSettingsModel;
  public commands: CommandModel[];

  accounts: DropDowns[];
  campaigns: DropDowns[];
  filterForm: FormGroup;
  submitted:boolean = false;
  showmore:boolean = false;
  moredata:boolean = false;
  colapsed:boolean = true;

  hcplist:any;
  morehcplist:any;
  specialties:Array<Object> = [];
  states:Array<Object> = [];
  ownership:Array<Object> = [];
  spl_spinner_loader:boolean = false;
  loc_spinner_loader:boolean = false;
  moreinfo:boolean=true;
  public resizeSettings;

  empList = [];

  selectedAccount = 0;
  selectedCampaign = 0;
  acc_id:number = 0;
  campaign_id:number = 0;
  top_hcp:number = 0;
  campaign_array = [];
  
 
constructor( private dataService: DataService,private formBuilder:FormBuilder ) {

  this.resizeSettings = { allowResizing: true, resizeMode:"nextcolumn"}; 
  this.editSettings = { allowEditing: true, allowDeleting: true };
  this.commands = [{ buttonOption: { content: 'More', cssClass: 'e-control e-btn', click: this.onOpenDialog.bind(this) } }];

 }

  // maps the appropriate column to fields property
  
 
ngOnInit() {
    this.getCampaigns(this.acc_id);
    this.getSpecialty(this.campaign_array);
    this.getStates(this.campaign_array);
    this.getHcpList(0);
    this.getOwnership();
    
    this.filterForm = this.formBuilder.group({
      
      npi:['',Validators.required],
      first_name:[ '', Validators.required ],
      last_name:[ '', Validators.required ],
      hcp_email:[ '', Validators.required ],
      ownership_id:[ '', Validators.required ],
      campaign_id:[ '', Validators.required ],
      top_hcp:[ '', Validators.required ],
      tp_specialty_id:[ '', Validators.required ],
      tp_state_id:[ '', Validators.required ],
      network_type:[ '', Validators.required ]

    });

  }

public fields: Object = { text: 'name', value: 'id' };


// Initialize the Dialog component's target element.
public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
}

public visible: Boolean = false;

// Hide the Dialog when click the footer button.
public hideDialog: EmitType<object> = () => {
  this.ejDialog.hide();
}

// Enables the footer buttons
public buttons: Object = [
  /* {
    'click': this.hideDialog.bind(this),
    // Accessing button component properties by buttonModel property
      buttonModel:{
        content:'OK',
        //Enables the primary button
        isPrimary: true
      }
    }, */
    {
        'click': this.hideDialog.bind(this),
        buttonModel:{
          content:'Close'
        }
    }
];

// Sample level code to handle the button click action
public onOpenDialog = function(event: any): void {
    // Call the show method to open the Dialog
  this.moredata = true; 
  this.getMoreHcpList(this.filterForm.value);
  this.ejDialog.show();

}

// Sample level code to hide the Dialog when click the Dialog overlay
public onOverlayClick: EmitType<object> = () => {
  this.ejDialog.hide();
}


 /*onSelectAccount(acc_id: number) {
    this.specialties = [];
    this.states = []; 
    this.selectedAccount = acc_id;
    this.selectedCampaign = 0;
    if(acc_id != 0 ){
      this.campaigns = this.getCampaigns(acc_id);
    }else{
      this.campaigns = [];
    }
   /* this.states = this.getCampaigns().filter((item) => {
      return item.country_id === Number(country_id)
    });
  } */

  onSelectCampaign(event) {
    //console.log(this.selectedCampaign);
    this.colapsed = false;
    //console.log(this.campaignObj.value + "------> campaign");
    this.spl_spinner_loader = true;
    this.loc_spinner_loader = true;
   
    if( this.campaignObj.value ){
      this.getSpecialty(this.campaignObj.value);
      this.getStates(this.campaignObj.value);
    }

  }
 
  onSubmit(){
    
    this.submitted = true;
    this.moredata = false;
    this.morehcplist = '';
    this.getHcpList(this.filterForm.value);

    if(this.filterForm.value.first_name !='' && this.filterForm.value.campaign_id == 0 && this.filterForm.value.last_name =='' && this.filterForm.value.npi =='' && this.filterForm.value.hcp_email =='' && this.filterForm.value.tp_specialty_id =='' && this.filterForm.value.tp_state_id =='' && this.filterForm.value.network_type ==''   ){
      
       this.showmore = true;
    
    }else if( this.filterForm.value.last_name !='' && this.filterForm.value.campaign_id == 0 && this.filterForm.value.first_name =='' && this.filterForm.value.npi =='' && this.filterForm.value.hcp_email =='' && this.filterForm.value.tp_specialty_id =='' && this.filterForm.value.tp_state_id =='' && this.filterForm.value.network_type =='' ){
      
      this.showmore = true;
    
    }else{
      
      this.showmore = false;
    
    }
    //console.log( this.showmore + 'test showmore----->');
  }

  formReset(){
    this.filterForm.reset();
  }


getAccounts() {
    
  this.dataService.getAccountDetails()
     .subscribe( data => {
       this.accounts = data;
     });
 
} 

getSpecialty(campaign_array:any) {
  
  this.dataService.getSpecialtyDetails(campaign_array)
   .subscribe( data => {
     this.specialties = data;
     this.spl_spinner_loader = false;
     //console.log(this.specialties+'haii');
   });
  
}

getStates(campaign_array:any) {
  
  this.dataService.getStateDetails(campaign_array)
   .subscribe( data => {
     this.states = data;
     this.loc_spinner_loader = false;
   });
   
}

getCampaigns(acc_id:number): any{
  this.dataService.getCampaignDetails(acc_id)
     .subscribe( data => {
        this.campaigns = data;
     });
}

getOwnership(): any{
  this.dataService.getOwnershipDetails()
     .subscribe( data => {
        this.ownership = data;
     });
} 

 
getHcpList(filterValues:any) { 
  //console.log(filterValues);
  this.dataService.getHcplistDetails(filterValues,this.moredata)
   .subscribe( data => {
     this.hcplist = data;
     //console.log(this.hcplist);
   });
}

getMoreHcpList(filterValues:any) { 
  //console.log(filterValues);
  this.dataService.getHcplistDetails(filterValues,this.moredata)
   .subscribe( data => {
     this.morehcplist = data;
     //console.log(this.hcplist);
   });
}

}
