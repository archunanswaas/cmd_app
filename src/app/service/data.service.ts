import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { DropDowns } from '../model/dropdowns.model'; 
import { Totalcount,fileDetails,ValidationSummary } from '../model/totalcount.model';
import { Hcplist,validationHeader } from '../model/hcplist.model';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http'; 

  
 
@Injectable()
export class DataService{ 

    headers: Headers;
    options: RequestOptions;
 
 
    constructor(private http:HttpClient){

      //this.headers = new Headers({  'Content-Type': 'multipart/form-data' });
      //this.options = new RequestOptions({ headers: this.headers }); 
      const headers = new Headers();
      headers.append('accept-language', 'en');
      headers.append('Content-Type', 'multipart/form-data');
        
    }
    baseUrl: string = 'http://localhost:3000'; 
 

    getPlatformDetailsRMS(){
        return this.http.get<DropDowns[]>(this.baseUrl+'/patformsrms');
    }

    getCampaignDetailsRMS(platform_id:any){
        return this.http.post<DropDowns[]>(this.baseUrl+'/campaignsrms', { platform_id: platform_id }   );
    }

    getAccountDetailsRMS(platform_id,campaign_id){
        return this.http.post<DropDowns[]>(this.baseUrl+'/accountsrms', { platform_id,campaign_id } );
    }
    
    getAccountDetails(){
        return this.http.get<DropDowns[]>(this.baseUrl+'/accounts');
    }
    
    getSpecialtyDetails(campaign_array:any){
        return this.http.post<DropDowns[]>(this.baseUrl+'/specialty',{ campaign_array : campaign_array});
    }

    getStateDetails(campaign_array:any){
        return this.http.post<DropDowns[]>(this.baseUrl+'/states',{ campaign_array : campaign_array});
    }

    getCampaignDetails(acc_id:any){
        return this.http.get<DropDowns[]>(this.baseUrl+'/campaigns/'+acc_id);
    }

    getOwnershipDetails(){
        return this.http.get<DropDowns[]>(this.baseUrl+'/ownership');
    }

    getTotalHcp(acc_id:number,campaign_id:number){
        return this.http.get<Totalcount>(this.baseUrl+'/totalhcp/'+ acc_id +'/'+ campaign_id);
    }

    getTotalEmailSent(acc_id:number,campaign_id:number){
        return this.http.get<Totalcount>(this.baseUrl+'/totalemailsent/'+ acc_id +'/'+ campaign_id);
    }

    getTotalEmailOpen(acc_id:number,campaign_id:number){
        return this.http.get<Totalcount>(this.baseUrl+'/totalemailopen/'+ acc_id +'/'+ campaign_id);
    }

    getTotalEmailClick(acc_id:number,campaign_id:number){
        return this.http.get<Totalcount>(this.baseUrl+'/totalemailclick/'+ acc_id +'/'+ campaign_id);
    }   

    getTotalAssetClick(acc_id:number,campaign_id:number){
        return this.http.get<Totalcount>(this.baseUrl+'/totalassetclick/'+ acc_id +'/'+ campaign_id);
    }

    getHcplistDetails(param:any,moredata:boolean){
      
        return this.http.post<Hcplist[]>(this.baseUrl+'/hcplist', {  param,moredata }  );
    }
 
    validationRunDetails( ValidateFormData:any  ){
        return this.http.post(this.baseUrl+'/validationRun',{ ValidateFormData } ).toPromise()
        .then( (response) => { return response; } );
    }

    uploadfile(formData):Promise<any>{ 
      
        return this.http.post(this.baseUrl+'/upload', formData  ).toPromise()
        .then( (response) => { return response;  });
    
    }  

    
    validationSummaryDetails(StageID,RunID){
        
        return this.http.post<validationHeader[]>(this.baseUrl+'/validationSummary',{ StageID,RunID }).toPromise()
        .then( (response) => { return response; }  );
    
    }

    rmsRunDetailsSummaryMockData(){
      
       return this.http.get<validationHeader[]>('assets/run_export2.json').toPromise()
       .then(  (response) =>   { return response;  });       
       
    }

    rmsRunDetailsExportMockData(Run_ID){
        return this.http.get('assets/run_export1.json');       
    }

    rmsRunDetailsExport(Stage_ID,Run_ID,ExportFilterOption){
        return this.http.post(this.baseUrl+'/RMS_Validation_Export', { Stage_ID,Run_ID,ExportFilterOption } ); 
    }

    validateRunDetailsExport(Run_ID,ExportFilterOption){
        return this.http.post(this.baseUrl+'/Export_validated_Details', { Run_ID,ExportFilterOption } ); 
    }

    rmsRunComplete(Stage_ID){
        return this.http.post(this.baseUrl+'/rmsRunComplete', { Stage_ID } ).toPromise()
        .then( (response) =>   { return response;  } ); 
    }    

    rmsRunDetailsMockData(){
        return this.http.get<validationHeader[]>('assets/rms_run_details.json').toPromise()
        .then(  (response) =>   { return response;  });
    }

    rmsExportDetails(SearchParams:any,stageID,runID){

        //return this.http.post<validationHeader[]>(this.baseUrl+'/rmsRun',{ SearchParams,stageID,runID });
    
    }

    RmsRun(SearchParams:any,stageID,runID){
        
        return this.http.post(this.baseUrl+'/rmsRun',{ SearchParams,stageID,runID });
    
    }

    RMSOverAllSummary(){
        
        return this.http.get(this.baseUrl+'/RMSOverAllSummary');
    
    }

    alalyzeRunGetSummary(stageID,runID){
        return this.http.post(this.baseUrl+'/RmsRunGetSummary', {stageID,runID } ).toPromise()
        .then(  (response) =>   { return response;  });
    }

    GetTabView(StageID){
        return this.http.post(this.baseUrl+'/GetTabView',{ StageID });
    }

    validationInfoDetails(StageID){ 
        return this.http.post(this.baseUrl+'/validationInfoDetails',{ StageID }).toPromise()
        .then( (response) => { return response; }  );
    }

    MakeAsDefault(stageID,runID){ 
        console.log(stageID,runID);
        return this.http.post(this.baseUrl+'/MakeAsDefault',{ stageID,runID }).toPromise()
        .then( (response) => { return response; }  );
    }
}