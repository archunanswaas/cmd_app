export class Hcplist { 
    
    cmd_id:number;
    first_name:string;
    last_name:string;
    email:string; 
    tp_speciality_id:number;
    tot_email_sent:number;
    tot_email_click:number;
    tot_email_open:number;
    tot_email_engagement:number;

}

export class validationHeader {
    
    Platform_ID:number;
    Account_ID:number; 
    Campaign_ID:number;
    Upload_File_Name:string; 
    Upload_File_Path:string; 
    Total_No_Of_Rows:number; 
    Uploaded_By:string;
    //Upload_Datetime:Date; 
    //Status:number; 
    OverallRunStatus:number;
    
}