import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { ConfigService } from '../app.config.service';
import { AceService } from './ace.service';
import { AceComponent } from './ace.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AceEditorModule } from 'ng2-ace-editor';
import { of, BehaviorSubject, Observable} from 'rxjs';
import { throwError } from 'rxjs';

describe('AceComponent', () => {
  let component: AceComponent;
  let fixture: ComponentFixture<AceComponent>;
  let httpTestingController: HttpTestingController;
  let service: AceService;
  class ChildComponent{
    commands = this;
    // tslint:disable-next-line:variable-name
    _editor = {
      session: '',
      gotoLine: (a) => this
    };
    setOptions(a){
      return this;
    }
    getEditor(){
      return this;
    }
    addCommand(a){
      return this;
    }
  }

  class AceServiceStub3 {
    validate = () => {
       return of({ valid: true,
        lineNumber: 10});
    }
  }
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
        AceService,
        { provide: ConfigService, useFactory: configServiceStub },
        { provide: AceService, useClass: AceServiceStub3 },
      ],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(AceService);
    fixture = TestBed.createComponent(AceComponent);
    component = fixture.componentInstance;
  });
  afterEach(() => {
    // httpTestingController.verify();
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('expect ngOnInit havebeen called', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });
  it(`isValidationSuccess has default value`, () => {
    expect(component.isValidationSuccess).toEqual(true);
  });
  it(`expect ngAfterViewInit havebeen called`, () => {
    component.editor = new ChildComponent();
    spyOn(component.editor, 'getEditor').and.callThrough();
    component.editor.mode = 'yaml';
    component.editor.value = {};
    component.ngAfterViewInit();
    expect(component.editor.mode).toEqual('yaml');
  });
  it(`validate shareByEmail method`, () => {
    component.editor = new ChildComponent();
    component.editor.value = {};
    component.shareByEmail();
    expect(window.location.href).toEqual('mailto:?cc=anandvarkeyphilips@gmail.com&subject=Data%20used%20for%20validation&body=%5Bobject%20Object%5D');
  });
  it(`test process method`, () => {
    component.editor = new ChildComponent();
    spyOn(component, 'validate').and.callThrough();
    spyOn(service, 'validate').and.returnValue(
      of({
          valid: 'true',
      })
    );
    component.editor.value = {};
    component.validationResultBlock = {
      nativeElement: jest.fn(),
    };
    component.process('');
    expect(component.validate).toHaveBeenCalled();
  });
  it(`test process method2`, () => {
    component.editor = new ChildComponent();
    spyOn(component, 'validate').and.callThrough();
    spyOn(service, 'validate').and.returnValue(
      of({
          valid: 'true',
      })
    );
    component.validationResultBlock = {
      nativeElement: jest.fn(),
    };
    component.process('');
    expect(component.validate).toHaveBeenCalled();
  });
  it(`test validate method2`, () => {
    component.editor = new ChildComponent();
    spyOn(component, 'validate').and.callThrough();
    spyOn(service, 'validate').and.returnValue(
      of({
          valid: 'true',
      })
    );
    component.validationResultBlock = {
      nativeElement: jest.fn(),
    };
    component.validate('', 'json');
    expect(service.validate).toHaveBeenCalled();
  });

  it(`test validate method`, () => {
    component.editor = new ChildComponent();
    spyOn(component, 'validate').and.callThrough();
    spyOn(service, 'validate').and.returnValue(
      of({
          valid: '',
          lineNumber: 10
      })
    );
    component.validationResultBlock = {
      nativeElement: jest.fn(),
    };
    component.validate('', 'json');
    expect(service.validate).toHaveBeenCalled();
  });

  it(`test validate method3`, () => {
    component.editor = new ChildComponent();
    spyOn(component, 'validate').and.callThrough();
    spyOn(service, 'validate').and.returnValue(
      throwError( ''));
    component.validationResultBlock = {
      nativeElement: jest.fn(),
    };
    component.validate('', 'json');
    expect(service.validate).toHaveBeenCalled();
  });

  it('expects service to fetch data', () => {
    service.validate('', 'yaml').subscribe((data) => {
    });
    const req = httpTestingController.expectNone('http://localhost:9876/yaml');
  });
  it(`validate shareByEmail method2`, () => {
    window.alert = jest.fn();
    component.editor = new ChildComponent();
    component.editor.value = `server:
    port: 8090
    servlet.context-path: /enterprise-validator
  logging:
    level.root: info
    level.io.exnihilo: debug
    file: /packages/logs/enterprise-validator/enterprise-validator.log
  spring.pid.fail-on-write-error: true
  spring.pid.file: /packages/config/enterprise-validator/enterprise-validator.pid
  management:
    endpoints:
      web.exposure.include: "*"
      web.exposure.exclude: loggers
    endpoint:
      shutdown.enabled: true
      server:
    port: 8090
    servlet.context-path: /enterprise-validator
  logging:
    level.root: info
    level.io.exnihilo: debug
    file: /packages/logs/enterprise-validator/enterprise-validator.log
  spring.pid.fail-on-write-error: true
  spring.pid.file: /packages/config/enterprise-validator/enterprise-validator.pid
  management:
    endpoints:
      web.exposure.include: "*"
      web.exposure.exclude: loggers
    endpoint:
      shutdown.enabled: true
      server:
    port: 8090
    servlet.context-path: /enterprise-validator
  logging:
    level.root: info
    level.io.exnihilo: debug
    file: /packages/logs/enterprise-validator/enterprise-validator.log
  spring.pid.fail-on-write-error: true
  spring.pid.file: /packages/config/enterprise-validator/enterprise-validator.pid
  management:
    endpoints:
      web.exposure.include: "*"
      web.exposure.exclude: loggers
    endpoint:
      shutdown.enabled: true
      server:
    port: 8090
    servlet.context-path: /enterprise-validator
  logging:
    level.root: info
    level.io.exnihilo: debug
    file: /packages/logs/enterprise-validator/enterprise-validator.log
  spring.pid.fail-on-write-error: true
  spring.pid.file: /packages/config/enterprise-validator/enterprise-validator.pid
  management:
    endpoints:
      web.exposure.include: "*"
      web.exposure.exclude: loggers
    endpoint:
      shutdown.enabled: true
      server:
    port: 8090
    servlet.context-path: /enterprise-validator
  logging:
    level.root: info
    level.io.exnihilo: debug
    file: /packages/logs/enterprise-validator/enterprise-validator.log
  spring.pid.fail-on-write-error: true
  spring.pid.file: /packages/config/enterprise-validator/enterprise-validator.pid
  management:
    endpoints:
      web.exposure.include: "*"
      web.exposure.exclude: loggers
    endpoint:
      shutdown.enabled: true
      server:
    port: 8090
    servlet.context-path: /enterprise-validator
  logging:
    level.root: info
    level.io.exnihilo: debug
    file: /packages/logs/enterprise-validator/enterprise-validator.log
  spring.pid.fail-on-write-error: true
  spring.pid.file: /packages/config/enterprise-validator/enterprise-validator.pid
  management:
    endpoints:
      web.exposure.include: "*"
      web.exposure.exclude: loggers
    endpoint:
      shutdown.enabled: true
      server:
    port: 8090
    servlet.context-path: /enterprise-validator
  logging:
    level.root: info
    level.io.exnihilo: debug
    file: /packages/logs/enterprise-validator/enterprise-validator.log
  spring.pid.fail-on-write-error: true
  spring.pid.file: /packages/config/enterprise-validator/enterprise-validator.pid
  management:
    endpoints:
      web.exposure.include: "*"
      web.exposure.exclude: loggers
    endpoint:
      shutdown.enabled: true
      server:
    port: 8090
    servlet.context-path: /enterprise-validator
  logging:
    level.root: info
    level.io.exnihilo: debug
    file: /packages/logs/enterprise-validator/enterprise-validator.log
  spring.pid.fail-on-write-error: true
  spring.pid.file: /packages/config/enterprise-validator/enterprise-validator.pid
  management:
    endpoints:
      web.exposure.include: "*"
      web.exposure.exclude: loggers
    endpoint:
      shutdown.enabled: true
      server:
    port: 8090
    servlet.context-path: /enterprise-validator
  logging:
    level.root: info
    level.io.exnihilo: debug
    file: /packages/logs/enterprise-validator/enterprise-validator.log
  spring.pid.fail-on-write-error: true
  spring.pid.file: /packages/config/enterprise-validator/enterprise-validator.pid
  management:
    endpoints:
      web.exposure.include: "*"
      web.exposure.exclude: loggers
    endpoint:
      shutdown.enabled: true`;
    component.shareByEmail();
    expect(window.location.href).toEqual('mailto:?cc=anandvarkeyphilips@gmail.com&subject=Data%20used%20for%20validation&body=%5Bobject%20Object%5D');
    expect(component.shareByEmail()).toEqual(false);
  });
});

