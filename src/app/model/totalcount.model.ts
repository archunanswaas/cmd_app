export class Totalcount {
    tot_count:number;
}

export class csvData{
    tot_number_of_records:number;
    valid_records: number;
    rejected_records: number;
    Formdata:any;
}


export class validationHeaderArray{
    Platform_ID:number;
    Account_ID:number;
    Campaign_ID:number;
    Upload_File_Name:string;
    Upload_File_Path:string;
    //Total_No_Of_Rows:number;
    //Uploaded_By:string;
    //OverallRunStatus:number;
}


export class validationRunArray{
    //Staging_ID:number;
    Run_InitiatedBy:string;
    TotalNumberOfRecords:number;
    TotalNumberOfRejectedRecords:number;
    TotalNumberOfFoundRecords:number;
    Run_Status:number;
}


export class fileDetails{
    destination: string;
    filename: string;
}

export class testModel{
    testdata:string;
}

export class ValidationSummary{
    tot_number_of_records: number;
    valid_records: number;
	rejected_records: number;
	StageID:number;
	runID:number;
}