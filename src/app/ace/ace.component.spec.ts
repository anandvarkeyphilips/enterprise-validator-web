import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfigService } from '../app.config.service';
import { AceService } from './ace.service';
import { AceComponent } from './ace.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AceEditorModule } from 'ng2-ace-editor';
describe('AceComponent', () => {
  let component: AceComponent;
  let fixture: ComponentFixture<AceComponent>;
  const childComponent = jasmine.createSpyObj('ace-editor', ['value']);
  beforeEach(() => {
    const configServiceStub = () => ({
      getConfig: () => ({ subscribe: (f) => f({}) }),
    });
    const aceServiceStub = () => ({
      validate: (inputMessage, arg) => ({ subscribe: (f) => f({}) }),
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AceComponent],
      imports: [HttpClientTestingModule, AceEditorModule],
      providers: [
        { provide: ConfigService, useFactory: configServiceStub },
        { provide: AceService, useFactory: aceServiceStub },
      ],
    });
    fixture = TestBed.createComponent(AceComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it(`isValidationSuccess has default value`, () => {
    expect(component.isValidationSuccess).toEqual(true);
  });
  it(`expect ngAfterViewInit havebeen called`, () => {
    spyOn(component, 'ngAfterViewInit');
    component.ngAfterViewInit();
    expect(component.ngAfterViewInit).toHaveBeenCalled();
  });
  it(`validate shareByEmail method`, () => {
    component.editor = childComponent;
    component.editor.value = {};
    component.shareByEmail();
    expect(window.location.href).toEqual('http://localhost:9876/context.html');
  });
  it(`test process method`, () => {
    component.editor = childComponent;
    spyOn(component, 'validate').and.callThrough();

    component.editor.value = {};
    component.validationResultBlock = {
      nativeElement: jasmine.createSpyObj('nativeElement', ['focus']),
    };
    component.process('');
    expect(component.validate).toHaveBeenCalled();
  });
});
