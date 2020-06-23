import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ConfigService } from '../app.config.service';
import { Config } from 'protractor';
import { AceService } from './ace.service';

@Component({
  selector: 'app-ace',
  templateUrl: './ace.component.html',
  styleUrls: ['./ace.component.scss'],
})
export class AceComponent implements OnInit, AfterViewInit {
  @ViewChild('editor') editor;
  @ViewChild('validationResultBlock') validationResultBlock;

  public message: string;
  public isValidationSuccess = true;
  private baseUrl: string;

  constructor(configService: ConfigService, public aceService: AceService) {
    configService.getConfig().subscribe((data: Config) => {
      this.baseUrl = data.baseUrl;
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.editor.getEditor().setOptions({
      showLineNumbers: true,
      tabSize: 4,
    });

    this.editor.mode = 'yaml';
    this.editor.value = `server:
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
  }

  validate(inputMessage: string, url: string) {
    this.aceService
      .validate(inputMessage, this.baseUrl + url)
      .subscribe((data: any) => {
        this.editor.value = data.inputMessage;
        this.message = data.validationMessage;
        // this.editor.clearSelection();
        if (data.valid) {
          this.isValidationSuccess = true;
          const newEditSession = this.editor._editor.session;
          newEditSession.setAnnotations([]);
        } else {
          this.isValidationSuccess = false;
          if (data.lineNumber > 0) {
            const errorLineNumber = data.lineNumber - 1;
            const newEditSession = this.editor._editor.session;
            newEditSession.setAnnotations([
              {
                row: errorLineNumber,
                column: data.columnNumber,
                text: 'Error Message',
                type: 'error',
              },
            ]);
            this.editor._editor.gotoLine(
              data.lineNumber,
              data.columnNumber,
              true
            );
          }
        }
        this.validationResultBlock.nativeElement.focus();
      },
      (error) => {
        this.isValidationSuccess = true;
      });
  }

  process(endpoint: string) {
    this.validate(this.editor.value, endpoint);
  }

  shareByEmail() {
    if (this.editor.value.length > 2000) {
      alert(
        'The maximum Data Size for sharing by email is 2000 chars for the time being!'
      );
      return false;
    }
    const link =
      'mailto:' +
      '?cc=anandvarkeyphilips@gmail.com' +
      '&subject=' +
      escape('Data used for validation') +
      '&body=' +
      escape(this.editor.value);
    window.location.href = link;
  }
}
