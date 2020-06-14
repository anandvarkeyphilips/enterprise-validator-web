import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { ConfigService } from '../app.config.service';
import { Config } from 'protractor';
import { AceService } from './ace.service';

@Component({
  selector: 'app-ace',
  templateUrl: './ace.component.html',
  styleUrls: ['./ace.component.scss']
})
export class AceComponent implements OnInit, AfterViewInit {

  @ViewChild('editor') editor;
  @ViewChild('validationResultBlock') validationResultBlock;

  public message: String;
  public isValidationSucess = true;
  private baseUrl: String;

  constructor(configService: ConfigService, public aceService: AceService) {
    configService.getConfig()
      .subscribe((data: Config) => {
        this.baseUrl = data['baseUrl']
      });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.editor.getEditor().setOptions({
      showLineNumbers: true,
      tabSize: 4
    });

    this.editor.mode = 'yaml';
    this.editor.value =
      `server:
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

    this.editor.getEditor().commands.addCommand({
      name: "showOtherCompletions",
      bindKey: "Ctrl-.",
      exec: function (editor) {

      }
    });
  }

  validate(inputMessage: string, url: string) {
    this.aceService.validate(inputMessage, this.baseUrl + url).subscribe(
      (data: any) => {
        this.editor.value = data.inputMessage;
        this.message = data.validationMessage
        // this.editor.clearSelection();
        if (data.valid) {
          this.isValidationSucess = true;
        } else {
          this.isValidationSucess = false;
          if (data.lineNumber > 0) {
            const errorLineNumber = data.lineNumber;
            var newEditSession = this.editor.getSession();
            newEditSession.addGutterDecoration((errorLineNumber - 1), "failedGutter");
            this.editor.setSession(newEditSession);
            this.editor.gotoLine(data.lineNumber, data.columnNumber, true);
          }
        }
        this.validationResultBlock.nativeElement.focus();
      }
    ),
      (error) => this.isValidationSucess = true;
  }

  process(endpoint: string) {
    this.validate(this.editor.value, endpoint);
  }

  shareByEmail() {
    if (this.editor.value.length > 2000) {
      alert("The maximum Data Size for sharing by email is 2000 chars for the time being!")
      return false;
    }
    var link = "mailto:" +
      "?cc=anandvarkeyphilips@gmail.com" +
      "&subject=" + escape("Data used for validation") +
      "&body=" + escape(this.editor.value);
    window.location.href = link;
  }
}
