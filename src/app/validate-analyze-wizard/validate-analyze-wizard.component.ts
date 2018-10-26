import { Component, OnInit,AfterViewInit,ElementRef,ViewChild,TemplateRef   } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray,Validators , FormControl } from '@angular/forms';
import { csvData,validationHeaderArray,validationRunArray,fileDetails,ValidationSummary } from '../model/totalcount.model';
import { DataService } from "../service/data.service";

import { MultiSelectComponent,DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { DropDowns } from '../model/dropdowns.model';

import { ExcelService } from '../service/excel.service';
import { ShareDataService } from "../service/sharedata.service";
import { Router } from "@angular/router";



import { ToastrService } from 'ngx-toastr';
import { BsModalService,TabsetComponent  } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-validate-analyze-wizard',
  templateUrl: './validate-analyze-wizard.component.html',
  styleUrls: ['./validate-analyze-wizard.component.css'],
  providers:[ ValidateAnalyzeWizardComponent ]
})
export class ValidateAnalyzeWizardComponent implements OnInit {

  modalRef: BsModalRef;
  message: string;

  ExportstageId:number;
  ExportrunId:number;

  csvContent: string;
  file:any;
  headersRow = [];
  csvRecordsArray = [];
  validRowArray = [];
  invalidRowArray = []; 
  ValidatedDetails = [];
  ValidationSummary:csvData[];
  validationHeadersArray:any;
  validationRunArray:validationRunArray[];
  validationDetails = [];
  activeTab:number;
  totalRows:number = 0;
  validationRunStageIds = [];
  selectedFile: File;
  validationRunSummary:any;
  validationRunSummaryDetails:any;
  validationRunInfo:any;
  rmsExportDetails:any;
  uploadedFileDetails:any;
  HeaderRows = [];
  submitted = false;
  Rmssubmitted = false;
  IsPrimaryNotSelected:boolean;

  is_submitted_validate_export_form = false;
  is_submitted_rms_export_form = false;

  default_radio_val:number;

  filename:string;
  filepath:string;
  uploadedFileName:any;
  is_completed:number;

  spinner_loader:boolean = false;
  is_disabled:boolean = false;

 
  Accounts: any;
  Campaigns: any;
  patforms: DropDowns[];
  completeResponse:any;
  showValidationInfo:any;
  
  stageId:number;
  runId:number;
  STAGEID:any;
  ExportRunID:number;


  confirmResult:boolean = null;
  promptMessage:string = '';


  
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  
  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  
  // Create element reference for dialog target element.
  @ViewChild('ConfirmContainer', { read: ElementRef }) ConfirmContainer: ElementRef;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;
  public ConfirmDialogtargetElement: HTMLElement;

  @ViewChild('platform')
  public platformObj: DropDownListComponent;
  @ViewChild('campaign_id')
  public campaignObj: DropDownListComponent;
  @ViewChild('acc_id')
  public accObj: DropDownListComponent;
  @ViewChild('primary_fields')
  public primaryFieldsObj: DropDownListComponent;
  @ViewChild('excel_fields')
  public excelFieldsObj: DropDownListComponent;
  @ViewChild('file_headers')    
  public file_headersObject: MultiSelectComponent;   
  
  constructor(private route: ActivatedRoute,private modalService: BsModalService,private toastr: ToastrService,private shareData: ShareDataService,private router: Router,private dataService: DataService,private fb: FormBuilder,private RmsrunForm: FormBuilder,private el: ElementRef,private excelService:ExcelService) {
   
  }
  
  disableEnable() {
    this.staticTabs.tabs[1].disabled = true;
  }

  redirectToRMS(){
    if( (this.stageId == 0) && ( this.runId == 0) ){
      this.router.navigate(['rms']); 
    }
  }
  
  validateForm: FormGroup;
  RMSExportFilterForm:FormGroup;
  ValidateExportFilterForm:FormGroup;
  uploadForm: FormGroup;
  rmsRunForm: FormGroup;
  
  public SystemPreselectvalue: Object = { id: 'Email', p_fields: 'Email' }

  public fields:{ [key: string]: string } = { text: 'name', value: 'id' };
  public value:string[] = ['Email'];   

  public Platforms: Object[] =  [
    
    { id: 1, name: 'ALL' },
    { id: 2000, name: 'TP' },
    { id: 1033, name: 'WEBCAST' }  
  
  ];

  public MandatoryFields: Object[] = [
      
     /*  { id: 4, name: 'NPI' },
      { id: 0, name: 'First Name' },
      { id: 2, name: 'Last Name' }, */
      { id: 'NPI', name: 'NPI' },
      { id: 'First_Name', name: 'First Name' },
      { id: "Last_Name", name: 'Last Name' }
      
  ];
  
  public PrimaryFields: Object = { groupBy: 'category',text: 'p_fields', value: 'id' };
  
  

  public PrimaryFieldsData: Object[] =  [

      { id: 'First_Name,Primary',category: 'Primary', p_fields: 'First Name' },
      { id: 'Last_Name,Primary',category: 'Primary', p_fields: 'Last Name' },
      { id: 'Email,Primary',category: 'Primary', p_fields: 'Email' },
      { id: 'NPI,Primary',category: 'Primary', p_fields: 'NPI' },
      { id: 'City,Secondary',category: 'Secondary', p_fields: 'City' },
      { id: 'State,Secondary',category: 'Secondary', p_fields: 'State' },
      { id: 'Degree,Secondary',category: 'Secondary', p_fields: 'Degree' },
      { id: 'Specialty,Secondary',category: 'Secondary', p_fields: 'Specialty' },  
     
  ];

  public ExcelFieldsData: Object[] =  [

    { id: 'First_Name', p_fields: 'First_Name' },
    { id: 'Last_Name', p_fields: 'Last_Name' },
    { id: 'Email', p_fields: 'Email' },
    { id: 'NPI', p_fields: 'NPI' },
    { id: 'City', p_fields: 'City' },
    { id: 'State', p_fields: 'State' },
    { id: 'Degree', p_fields: 'Degree' },
    { id: 'Specialty', p_fields: 'Specialty' }  
       
];
  
  public SecondaryFieldsData: Object[] =  [
      { id: 'city', s_fields: 'City' },
      { id: 'state', s_fields: 'State' },  
      { id: 'zipCode', s_fields: 'ZipCode' }
  ];

  public SecondaryFields: Object = { text: 's_fields', value: 'id' };

  
  DefaultConfirmModal(event,item,template: TemplateRef<any>) {
    this.stageId = item.Staging_ID; 
    this.runId = item.Run_ID;
    this.IsDefault(item);
    event.target.checked = false;
    this.default_radio_val = item;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  CompleteConfirmModal(CompleteModaltemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(CompleteModaltemplate, {class: 'modal-sm'});
  }

  ExportOptionSelectModal(item,ExportModaltemplate: TemplateRef<any>) {
    this.ExportRunID =  item.Run_ID;
    this.modalRef = this.modalService.show(ExportModaltemplate, {class: 'modal-md'});
  }
 
  confirmDefault(): void {
   this.modalRef.hide();
  }
  
  CloseDefualtConfirmModal(): void {
    this.dataService.alalyzeRunGetSummary(this.stageId,this.runId)
     .then( (data) => {
          this.shareData.changeanalyzeRunSummaryDetails(data);
     });

    this.modalRef.hide();
  }

  CloseModal(){
    this.is_submitted_validate_export_form = false;
    this.is_submitted_rms_export_form = false;
    this.ValidateExportFilterForm.reset();
    this.RMSExportFilterForm.reset();
    this.modalRef.hide();
  }

  async MakeDefault(){

    await this.dataService.MakeAsDefault(this.stageId,this.runId)
    .then( (data) => {
      
      if(data > 0){
        this.toastr.success('Success', 'Set Default');
      }else{
        this.toastr.error('Failure', 'Set Default');
      }
      
      this.CloseModal();
    });
    
    this.dataService.alalyzeRunGetSummary(this.stageId,this.runId)
     .then( (data) => {
          this.shareData.changeanalyzeRunSummaryDetails(data);
     });
    
  }

  IsDefault(item){
    if(item.Default_Flag == 1){
      return true;
    }else{
      return false;
    }

  }

  ngOnInit(){
    
    this.route.queryParams
      .subscribe(params => {
        if(params.activeTab == 'Step2'){
          this.staticTabs.tabs[1].disabled = false;
          this.staticTabs.tabs[1].active = true;
        }else{
          this.staticTabs.tabs[0].active = true;
          this.staticTabs.tabs[1].disabled = false;  
        }
      });

    this.disableEnable();
    
    this.is_completed = 1; 
    this.showValidationInfo = 0;
    this.getCampaigns(1);
    this.getAccounts(1,1);
    /* Initiate the form structure */
    this.uploadForm = this.fb.group({
      platform_id:'1',
      acc_id:'1',
      campaign_id:'',
      uploadfiles:new FormControl('', [Validators.required])
    });
 
    
  this.RMSExportFilterForm = this.fb.group({
    RMSExportFilterCheckBox:new FormControl('', [Validators.required])
  });

  this.ValidateExportFilterForm = this.fb.group({
    ValidateExportFilterCheckBox:new FormControl('', [Validators.required])
  });

  this.validateForm = this.fb.group({
      file_headers:""
  });

  
   /*  for(let item of groupItems) {
        item.controls["SystemField"].setValidators(Validators.required);
        console.log(item.controls["FileField"]);
        item.controls["FileField"].setValidators(Validators.required);
    } */

    //this.activeTab = 0;

    //Data sync 
    this.shareData.currentactiveTab.subscribe( activetab => this.activeTab = activetab );
    this.shareData.currentstageID.subscribe( (stageid) => this.stageId = stageid );
    this.shareData.currentrunID.subscribe( (runid) => this.runId = runid );
    this.shareData.currentis_completed.subscribe( is_completed => this.is_completed = is_completed );
    this.shareData.currentvalidationRunSummary.subscribe( validationSummary => this.validationRunSummary = validationSummary );
    this.shareData.currentvalidationRunInfo.subscribe( validationInfo => this.validationRunInfo = validationInfo );
    this.shareData.currentanalyzeRunSummary.subscribe( analyzerunSummary => this.rmsExportDetails = analyzerunSummary );
    this.shareData.currentshowValidationInfo.subscribe( ShowRunInfo => this.showValidationInfo = ShowRunInfo );
    /* Initiate the form structure */
    this.rmsRunForm = this.RmsrunForm.group({
      field_comparisons: this.fb.array( [this.createItem()] ) 
    });
    
    //this.is_analyzeTab_active();
   

  }

public is_empty(value){
  if(value == "" || value == null || value == undefined ){
    return true;
  }else{
    return false;
  }
}

  /*** Platform *** Campaigns *** Accounts Dropdowns STARTS HERE ***/
  
  public onSelectPlatform(): void {
    
    if( this.platformObj.value ){

      this.campaignObj.text = null;
      this.accObj.text = null;
      this.getCampaigns(this.platformObj.value);
      this.getAccounts(this.platformObj.value,1);
    
    }

  }  

  public onSelectCampaign(): void {
   
    if( this.platformObj.value && this.campaignObj.value ){
      this.accObj.text = null;
      this.getAccounts(this.platformObj.value,this.campaignObj.value);
    }
  }

  public getCampaigns(platform_id:any){
    this.dataService.getCampaignDetailsRMS(platform_id)
       .subscribe( data => {
          this.Campaigns = data;
       });
  }

  public getAccounts(platform_id:any,campaign_id:any) {
    this.dataService.getAccountDetailsRMS(platform_id,campaign_id)
     .subscribe( data => {
       this.Accounts = data;
     });
  }

  

  /*** Platform *** Campaigns *** Accounts Dropdowns ENDS HERE ***/

  createItem(): FormGroup {
    return this.fb.group({
      SystemField: new FormControl('', [Validators.required]),
      FileField: new FormControl('', [Validators.required])
    });
  }

  get field_comparisons() {
    return this.rmsRunForm.get('field_comparisons') as FormArray;
  }

  get field_comparisons__() {
    return (this.rmsRunForm.get('field_comparisons') as FormArray).controls;
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.uploadForm.controls; }

  
  addRow() {
    this.field_comparisons.push(this.createItem());
  }
  
  deleteRow(index) {
    if(index != 0){
      this.field_comparisons.removeAt(index);
    }
  }


  async fileupload(){
   
    //set the value   
    this.submitted = true;
    if (this.uploadForm.invalid) { 
      return;
    }
    
    
    this.spinner_loader = true;
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#uploadfiles');
    let fileCount: number = inputEl.files.length;
    const formData = new FormData();
    
    if (fileCount > 0) { 
        
        formData.append('uploadfiles',inputEl.files.item(0)); 
        formData.append('platform_id',this.uploadForm.value.platform_id); 
        formData.append('campaign_id',this.uploadForm.value.campaign_id); 
        formData.append('account_id',this.uploadForm.value.acc_id);
        
        await this.dataService.uploadfile(formData)
        .then( (data) => {
         
          this.STAGEID = data[0];
          this.uploadedFileDetails = data[1];
           
          
          if(this.uploadedFileDetails){

            this.toastr.success('Success', 'File Upload');
            this.filename = this.uploadedFileDetails.filename;
            this.filepath = this.uploadedFileDetails.destination;
           
            this.is_disabled = true;
          
          }else{

            this.toastr.error('Failure', 'File Upload');
            this.filename = '';
            this.filepath = '';
            this.is_disabled = false; 

          } 
          
          this.spinner_loader = false;
        
        }); 

    }
  
  

  }

   
  async onSubmit(){
    
    this.spinner_loader = true;
    let is_validationRunSuccess; 
    this.validationHeadersArray = {  
              
      StageID: this.STAGEID.StageID,
      Upload_File_Name: this.uploadedFileDetails.filename, 
      Upload_File_Path: this.uploadedFileDetails.destination,
      Mandatory_Fields:this.validateForm.value.file_headers
  
    };
   
   await this.dataService.validationRunDetails(this.validationHeadersArray)
    .then( (data) => { 
      
      this.validationRunSummaryDetails = [];

      this.validationRunSummaryDetails = data[0];
      
      this.stageId = this.validationRunSummaryDetails.StageID;
      this.runId = this.validationRunSummaryDetails.RunID;
      

     if(this.runId && this.stageId){
          this.showValidationInfo = 1;
          this.get_validation_info(this.stageId);
          this.get_validation_summary(this.stageId,this.runId);
      }

      this.spinner_loader = false;

    }); 
  
  }
  


 /* validationRunDetails(ValidationFormData) { 
    
    this.dataService.validationRunDetails(ValidationFormData)
     .subscribe( data => {
       
      this.validationRunSummaryDetails = data;
      this.spinner_loader = false;
      return this.validationRunSummaryDetails; 
      
    });
  } */

  
  validateEmail(emailField){

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(emailField) == false) 
    {
      return false;
    }

    return true;
  }



  public validateTab(activeTab){
    this.staticTabs.tabs[activeTab].active = true;
  }
  
  
  public ActivateTab(activeTab){
    //this.staticTabs.tabs[activeTab].disabled = false;
    this.staticTabs.tabs[activeTab].active = true;
  } 

  public analyzeTab(activeTab){

    if(this.stageId && this.runId && this.stageId > 0 && this.runId > 0  ){
        
        this.staticTabs.tabs[activeTab].disabled = false;
        this.staticTabs.tabs[activeTab].active = true;
        this.get_validation_summary(this.stageId,this.runId);
    
    }
  
  }


  is_analyzeTab_active(){
    if(this.stageId && this.runId && this.stageId > 0 && this.runId > 0 ){
      return false;
    }else{
      return true;
    }
  }


  async get_validation_summary( StageID,RunID ) { 
   
    await this.dataService.validationSummaryDetails(StageID,RunID)
     .then( (data) => {
       this.validationRunSummary = {};
       this.validationRunSummary = data;
     });
     
  }

  async get_validation_info( StageID ) { 
   
    await this.dataService.validationInfoDetails(StageID)
     .then( (data) => {
      
      this.validationRunInfo = data;
      
     });
     
  }

  searchStringInArray (str, strArray) {
    
    var PrimaryTexts = []; 
    
    for (var j=0; j<strArray.length; j++) {
        
        var PrimaryFieldss = [];
        
        PrimaryFieldss = strArray[j]["SystemField"].split(",");
        PrimaryTexts.push(PrimaryFieldss[1]);
        
        if(PrimaryTexts.includes(str))
        return true;

    }

    return false;

  }

  onSubmitRmsRun() {
    
    this.Rmssubmitted = true;
    if (this.rmsRunForm.invalid) {
      return; 
    } 


    
    if(!this.searchStringInArray("Primary",this.rmsRunForm.value.field_comparisons)){
      this.IsPrimaryNotSelected = true;
      return;
    }else{
      this.IsPrimaryNotSelected = false;
    }
    
   
    let rmsFormData = []; 
    
    rmsFormData = this.rmsRunForm.value.field_comparisons;

    this.dataService.RmsRun(rmsFormData,this.stageId,this.runId)
     .subscribe( data => {
        this.rmsExportDetails = data; 
      }); 

  }

  get RMSExportFilterFormData() { return this.RMSExportFilterForm.controls; }

  get ValidateExportFilterFormData() { return this.ValidateExportFilterForm.controls; } 

  RMSExportOptionSelectModal(item,RMSExportModal: TemplateRef<any>) {
    this.ExportstageId =  item.Staging_ID;
    this.ExportrunId =  item.Run_ID;
    this.modalRef = this.modalService.show(RMSExportModal);
  }

  ValidateExportOptionSelectModal(item,ValidateExportModal: TemplateRef<any>) {
    
    this.ExportstageId =  item.Staging_ID;
    this.ExportrunId =  item.Run_ID;
    console.log(this.ExportstageId+","+this.ExportrunId);

    this.modalRef = this.modalService.show(ValidateExportModal);
  }

  exportRMSRunXLSX():void {

    this.is_submitted_rms_export_form = true;
    if (this.RMSExportFilterForm.invalid) {
      return;
    }
  

    if(this.ExportstageId != undefined && this.ExportstageId > 0 && this.ExportrunId != undefined && this.ExportrunId ){
      
      let ExportData;
   
      this.dataService.rmsRunDetailsExport(this.ExportstageId,this.ExportrunId,this.RMSExportFilterForm.value.RMSExportFilterCheckBox)
       .subscribe( (data) => {
        
        let Filename = "Analyze_Run_Report" + new  Date().getTime();
        ExportData = data;
        this.excelService.exportAsExcelFile( ExportData, Filename );
         
       }); 

      this.toastr.success('Success', 'File Export');
    }else{
      this.toastr.error('Failure', 'File Export');
    }
    
    this.CloseModal();
  }


  exportValidationRunXLSX():void {

    this.is_submitted_validate_export_form = true;
    if (this.ValidateExportFilterForm.invalid) {
      return;
    }


    if(this.ExportstageId != undefined && this.ExportstageId > 0 && this.ExportrunId != undefined && this.ExportrunId ){
      
      let ExportData;
   
      this.dataService.rmsRunDetailsExport(this.ExportstageId,this.ExportrunId,this.ValidateExportFilterForm.value.ValidateExportFilterCheckBox)
       .subscribe( (data) => {
        
        let Filename = "Validation_Run_Report" + new  Date().getTime();
        ExportData = data;
        this.excelService.exportAsExcelFile( ExportData, Filename );
         
       }); 
       this.toastr.success('Success', 'File Export');
    }else{
      this.toastr.error('Failure', 'File Export');
    }

    this.CloseModal();
    
  }


  
  

  async completeRmsRun(){
    
    await this.dataService.rmsRunComplete(this.stageId)
    .then( (data) => {
      
      this.completeResponse = data;
      console.log(this.completeResponse);
      if(this.completeResponse){
        this.toastr.success('Success', 'Set Complete');
        this.router.navigate(['rms']);
      }else{
        this.toastr.error('Failure', 'Set Complete');
      }
      
    });  
    this.modalRef.hide();
  }

  getNowDate() {
      //return string
      var returnDate = "";
      //get datetime now
      var today = new Date();
      //split
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //because January is 0! 
      var yyyy = today.getFullYear();
      //Interpolation date
      if (dd < 10) {
        returnDate += `0${dd}.`;
      } else {
        returnDate += `${dd}.`;
      }

      if (mm < 10) {
        returnDate += `0${mm}.`;
      } else {
        returnDate += `${mm}.`;
      }
      returnDate += yyyy;
      return returnDate;
}




}
