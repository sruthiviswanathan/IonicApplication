import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommonheaderComponent } from './commonheader.component';

describe('CommonheaderComponent', () => {
  let component: CommonheaderComponent;
  let fixture: ComponentFixture<CommonheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonheaderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommonheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
