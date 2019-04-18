import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDropContainerComponent } from './image-drop-container.component';

describe('ImageDropContainerComponent', () => {
  let component: ImageDropContainerComponent;
  let fixture: ComponentFixture<ImageDropContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDropContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDropContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
