import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MydatasComponent } from './mydatas.component';

describe('MydatasComponent', () => {
  let component: MydatasComponent;
  let fixture: ComponentFixture<MydatasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MydatasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MydatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
