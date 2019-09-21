import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFullpageComponent } from './template-fullpage.component';

describe('TemplateFullpageComponent', () => {
  let component: TemplateFullpageComponent;
  let fixture: ComponentFixture<TemplateFullpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateFullpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFullpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
