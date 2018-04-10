import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotshopComponent } from './hotshop.component';

describe('HotshopComponent', () => {
  let component: HotshopComponent;
  let fixture: ComponentFixture<HotshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
