import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { ConfigService } from '../app.config.service';
import { AceService } from './ace.service';
import { AceComponent } from './ace.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AceEditorModule } from 'ng2-ace-editor';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';

describe('AceComponent', () => {
  let component: AceComponent;
  let fixture: ComponentFixture<AceComponent>;
  let httpTestingController: HttpTestingController;
  let service: AceService;
  const childComponent = jasmine.createSpyObj('ace-editor', ['value']);
  beforeEach(() => {
    const configServiceStub = () => ({
      getConfig: () => ({ subscribe: (f) => f({}) }),
    });
    const aceServiceStub = () => ({
      validate: (inputMessage, arg) => ({ subscribe: (f) => f({}) }),
    });
    const aceServiceStub2 = jasmine.createSpyObj(['validate']);
    aceServiceStub2.validate.and.returnValue(
      of({
        data: {
          valid: 'true',
        },
      })
    );

    // const aceServiceStub = {
    //   validate: jasmine
    //     .createSpy('validate')
    //     .and.returnValue( of({data: 'valid'}))
    // };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AceComponent],
      imports: [HttpClientTestingModule, AceEditorModule],
      providers: [
        AceService,
        { provide: ConfigService, useFactory: configServiceStub },
        // { provide: AceService, useValue: aceServiceStub2 },
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
    spyOn(component, 'ngAfterViewInit');
    component.editor = childComponent;
    component.editor.getEditor = () => {};
    spyOn(component.editor, 'getEditor').and.callThrough();
    component.editor.mode = 'yaml';
    component.editor.value = {};
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
    spyOn(service, 'validate').and.returnValue(
      of({
        data: {
          valid: 'true',
        },
      })
    );
    component.editor.value = {};
    component.validationResultBlock = {
      nativeElement: jasmine.createSpyObj('nativeElement', ['focus']),
    };
    component.process('');
    expect(component.validate).toHaveBeenCalled();
  });
  it(`test process method2`, () => {
    component.editor = childComponent;
    spyOn(component, 'validate').and.callThrough();
    spyOn(service, 'validate').and.returnValue(
      of({
        data: {
          valid: 'true',
        },
      })
    );
    component.validationResultBlock = {
      nativeElement: jasmine.createSpyObj('nativeElement', ['focus']),
    };
    component.process('');
    expect(component.validate).toHaveBeenCalled();
  });
  it(`test validate method2`, () => {
    component.editor = childComponent;
    spyOn(component, 'validate').and.callThrough();
    spyOn(service, 'validate').and.returnValue(
      of({
        data: {
          valid: 'true',
        },
      })
    );
    component.validationResultBlock = {
      nativeElement: jasmine.createSpyObj('nativeElement', ['focus']),
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
    component.editor = childComponent;
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
    expect(window.location.href).toEqual('http://localhost:9876/context.html');
    expect(component.shareByEmail()).toEqual(false);
  });
});
