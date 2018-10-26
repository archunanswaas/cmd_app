import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateAnalyzeWizardComponent } from './validate-analyze-wizard.component';

describe('ValidateAnalyzeWizardComponent', () => {
  let component: ValidateAnalyzeWizardComponent;
  let fixture: ComponentFixture<ValidateAnalyzeWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateAnalyzeWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateAnalyzeWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
