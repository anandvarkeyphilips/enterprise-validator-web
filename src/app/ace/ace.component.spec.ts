import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AceComponent } from './ace.component';
import { AceEditorModule } from 'ng2-ace-editor';

describe('AceComponent', () => {
  let component: AceComponent;
  let fixture: ComponentFixture<AceComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AceEditorModule
      ],
      declarations: [ AceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
