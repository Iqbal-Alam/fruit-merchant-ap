import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItementryComponent } from './itementry.component';

describe('ItementryComponent', () => {
  let component: ItementryComponent;
  let fixture: ComponentFixture<ItementryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItementryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItementryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
