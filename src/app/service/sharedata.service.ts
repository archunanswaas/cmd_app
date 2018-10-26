import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ShareDataService {

  private activeTab = new BehaviorSubject(0);
  private stageID   = new BehaviorSubject(0);
  private runID     = new BehaviorSubject(0);
  private is_completed = new BehaviorSubject(1);
  private validationRunSummary = new BehaviorSubject([]);
  private validationRunInfo = new BehaviorSubject([]);
  private rmsExportDetails = new BehaviorSubject([]);
  private showValidationInfo = new BehaviorSubject(1);

  currentactiveTab  = this.activeTab.asObservable();
  currentstageID    = this.stageID.asObservable();
  currentrunID      = this.runID.asObservable();
  currentis_completed = this.is_completed.asObservable();
  currentvalidationRunSummary = this.validationRunSummary.asObservable();
  currentvalidationRunInfo = this.validationRunInfo.asObservable();
  currentanalyzeRunSummary = this.rmsExportDetails.asObservable();
  currentshowValidationInfo = this.showValidationInfo.asObservable();


  constructor() { }

  changeActiveTab(activetab: number) {
    this.activeTab.next(activetab)
  }


  changeStageID(stageid: number) {
    this.stageID.next(stageid)
  }

  changeRunID(runid: number) {
    this.runID.next(runid)
  }
  
  changeshowValidationInfo(param: number) {
    this.showValidationInfo.next(param)
  }

  changeis_param_analyze_active(paramid: number) {
    this.is_completed.next(paramid)
  }
  
  changevalidationRunSummaryDetails(validationRunArray: any) {
    this.validationRunSummary.next(validationRunArray)
  }

  changevalidationRunInfoDetails(validationRunInfoArray: any) {
    this.validationRunInfo.next(validationRunInfoArray)
  }

  changeanalyzeRunSummaryDetails(analyzeRunSummaryArray: any) {
    this.rmsExportDetails.next(analyzeRunSummaryArray)
  }

}