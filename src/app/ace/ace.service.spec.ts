import { TestBed } from '@angular/core/testing';

import { AceService } from './ace.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AceEditorModule } from 'ng2-ace-editor';

describe('AceService', () => {
  let service: AceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, AceEditorModule
      ],
      providers: [AceService],
      declarations: [
        
      ],
    });
    service = TestBed.inject(AceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
