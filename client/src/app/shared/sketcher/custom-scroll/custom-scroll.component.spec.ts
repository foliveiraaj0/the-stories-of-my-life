import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomScrollComponent } from './custom-scroll.component';

describe('CustomScrollComponent', () => {
  let component: CustomScrollComponent;
  let fixture: ComponentFixture<CustomScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
