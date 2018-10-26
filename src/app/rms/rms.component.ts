import { Component, OnInit,TemplateRef,ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../service/data.service";
import { ShareDataService } from "../service/sharedata.service";
import { ValidateAnalyzeWizardComponent } from "../validate-analyze-wizard/validate-analyze-wizard.component";
import {ExcelService} from '../service/excel.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, FormArray,Validators , FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalService,TabsetComponent  } from 'ngx-bootstrap';



@Component({
  selector: 'app-rms',
  templateUrl: './rms.component.html',
  styleUrls: ['./rms.component.css'],
  providers:[ ValidateAnalyzeWizardComponent ]
})


export class RmsComponent implements OnInit {

  public rundetailsData:any;
  public TabID:any;
  modalRef: BsModalRef;
  message: string;
  ExportRunID:number;

  RMSExportFilterForm:FormGroup;
  ValidateExportFilterForm:FormGroup;

  validationRunSummary:any;
  validationRunInfo:any;
  rmsExportDetails:any;

  Stage_ID:number;
  Run_ID:number;

  ExportStage_ID:number;
  ExportRun_ID:number;

  is_submitted_validate_export_form = false;
  is_submitted_rms_export_form = false;


  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  constructor(private toastr: ToastrService,private fb: FormBuilder,private modalService: BsModalService,private shareData: ShareDataService,private router: Router,private dataService: DataService,private validAnalyze:ValidateAnalyzeWizardComponent,private excelService:ExcelService) { }

  ngOnInit() {

   this.getRmsRunDetails();

  this.RMSExportFilterForm = this.fb.group({
    RMSExportFilterCheckBox:new FormControl('', [Validators.required])
  });

  this.ValidateExportFilterForm = this.fb.group({
    ValidateExportFilterCheckBox:new FormControl('', [Validators.required])
  });

  }

get RMSExportFilterFormData() { return this.RMSExportFilterForm.controls; }

get ValidateExportFilterFormData() { return this.ValidateExportFilterForm.controls; }

  validateananalyze(): void {
    this.shareData.changeActiveTab(0);
    this.shareData.changeStageID(0);
    this.shareData.changeRunID(0);
    this.validAnalyze.analyzeTab(0);
    this.shareData.changeis_param_analyze_active(1);
    this.shareData.changevalidationRunSummaryDetails([]);
    this.shareData.changeanalyzeRunSummaryDetails([]);
    this.shareData.changeshowValidationInfo(0);
    this.router.navigate(['ValidateAnalyze']);
    
  };

  getRmsRunDetails() { 
    //console.log(filterValues);
    this.dataService.RMSOverAllSummary()
     .subscribe( data => {
       this.rundetailsData = data;
      }
     );
  }


  is_completed(item){
    
    if(item.OverallRunStatus > 0){
      return true;
    }else{
      return false;
    }
  }


  is_empty(value){
    if(value == "" || value == null || value == undefined ){
      return true;
    }else{
      return false;
    }
  }

  RMSExportOptionSelectModal(item,RMSExportModal: TemplateRef<any>) {
    this.ExportStage_ID =  item.Staging_ID;
    this.ExportRun_ID =  item.Run_ID;
    this.modalRef = this.modalService.show(RMSExportModal);
  }

  ValidateExportOptionSelectModal(item,ValidateExportModal: TemplateRef<any>) {
    this.ExportStage_ID =  item.Staging_ID;
    this.ExportRun_ID =  item.Run_ID;
    this.modalRef = this.modalService.show(ValidateExportModal);
  }

  CloseModal(){
    this.is_submitted_validate_export_form = false;
    this.is_submitted_rms_export_form = false;
    this.ValidateExportFilterForm.reset();
    this.RMSExportFilterForm.reset();
    this.modalRef.hide();
  }


  DefaultConfirmModal(item,template: TemplateRef<any>) {
    this.Stage_ID = item.Staging_ID; 
    this.Run_ID = item.Run_ID;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  IsDefault(item){
    if(item.Default_Flag == 1){
      return true;
    }else{
      return false;
    }

  }

  async MakeDefault(){

    
    await this.dataService.MakeAsDefault(this.Stage_ID,this.Run_ID)
    .then( (data) => {
      
      if(data > 0){
        this.toastr.success('Success', 'Set Default');
      }else{
        this.toastr.error('Failure', 'Set Default');
      }
      
      
    });  
    this.CloseModal();
  }

  exportRMSRunXLSX():void {

    this.is_submitted_rms_export_form = true;
    if (this.RMSExportFilterForm.invalid) {
      return;
    }
  

    if(this.ExportStage_ID != undefined && this.ExportStage_ID > 0 && this.ExportRun_ID != undefined && this.ExportRun_ID > 0 ){
      
      let ExportData;
   
      this.dataService.rmsRunDetailsExport(this.ExportStage_ID,this.ExportRun_ID,this.RMSExportFilterForm.value.RMSExportFilterCheckBox)
       .subscribe( (data) => {
        
        let Filename = "Analyze_Run_Report" + new  Date().getTime();
        ExportData = data;
        this.excelService.exportAsExcelFile( ExportData, Filename );
         
       }); 
      
      this.toastr.success('Success', 'File Export');
    }else{
      this.toastr.error('Failure', 'File Export');
    }
    this.is_submitted_rms_export_form = false;
    this.CloseModal();
    
  }


  exportValidationRunXLSX():void {

    this.is_submitted_validate_export_form = true;
    if (this.ValidateExportFilterForm.invalid) {
      return;
    }


    if(this.ExportStage_ID != undefined && this.ExportStage_ID > 0 && this.ExportRun_ID != undefined && this.ExportRun_ID > 0){
      
      let ExportData;
   
      this.dataService.rmsRunDetailsExport(this.ExportStage_ID,this.ExportRun_ID,this.ValidateExportFilterForm.value.ValidateExportFilterCheckBox)
       .subscribe( (data) => {
        
        let Filename = "Validation_Run_Report" + new  Date().getTime();
        ExportData = data;
        this.excelService.exportAsExcelFile( ExportData, Filename );
         
       }); 
      this.toastr.success('Success', 'File Export'); 
    }else{
      this.toastr.error('Failure', 'File Export');
    }
    this.is_submitted_validate_export_form = false;
    this.CloseModal();
    
  }



  CompleteConfirmModal(CompleteModaltemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(CompleteModaltemplate, {class: 'modal-sm'});
  }



  async view_report_modal(item,ViewReportModal: TemplateRef<any>){ 

    this.modalRef = this.modalService.show(ViewReportModal, {class: 'modal-lg'});
    
    this.validAnalyze.get_validation_summary(item.Staging_ID,item.Run_ID);

    await this.dataService.validationSummaryDetails(item.Staging_ID,item.Run_ID)
     .then( (data) => {
      this.validationRunSummary = data;
      //console.log(this.validationRunSummary);
     });

    await this.dataService.alalyzeRunGetSummary(item.Staging_ID,item.Run_ID)
     .then( (data) => {
      this.rmsExportDetails = data;
     }); 
     
     await this.dataService.validationInfoDetails(item.Staging_ID)
      .then( (data) => {
      this.validationRunInfo = data;
      
    });
    
  }

   resume(item){

   
    //this.shareData.changeActiveTab(1);

    this.dataService.GetTabView(item.Staging_ID)
    .subscribe( (data) => {
        this.TabID = data[0][0];

        if(this.TabID.NavigateTo == 1){
          console.log(this.TabID.NavigateTo);
          this.router.navigate(['ValidateAnalyze'],{ queryParams: { activeTab: 'Step1' } } ); 
         }else{
          console.log(this.TabID.NavigateTo);
          this.router.navigate(['ValidateAnalyze'],{ queryParams: { activeTab: 'Step2' } } ); 
         }

    });
  
    

    


    this.shareData.changeStageID(item.Staging_ID);
    this.shareData.changeRunID(item.Run_ID);
    
    //this.validAnalyze.validateTab(0);

    this.shareData.changeis_param_analyze_active(1);
    this.shareData.changeshowValidationInfo(1);
    //this.validAnalyze.get_validation_summary(item.Staging_ID,item.Run_ID);

    this.dataService.validationSummaryDetails(item.Staging_ID,item.Run_ID)
     .then( (data) => {
          this.shareData.changevalidationRunSummaryDetails(data);
     });

     this.dataService.validationInfoDetails(item.Staging_ID)
     .then( (data) => {
          this.shareData.changevalidationRunInfoDetails(data);
     });

     this.dataService.alalyzeRunGetSummary(item.Staging_ID,item.Run_ID)
     .then( (data) => {
          this.shareData.changeanalyzeRunSummaryDetails(data);
     });



  }


}
