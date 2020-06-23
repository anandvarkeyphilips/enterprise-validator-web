import { TestBed, inject} from '@angular/core/testing';

import { AceService } from './ace.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AceEditorModule } from 'ng2-ace-editor';
import { of } from 'rxjs';

describe('AceService', () => {
  let service: AceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AceEditorModule],
      providers: [AceService],
      declarations: [],
    });
    service = TestBed.inject(AceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`test validate method`, () => {
    const response = {
      headers: {
        post: jest.fn(() => ''),
      },
    };
    spyOn(service, 'validate').and.returnValue(
      of({
        valid: '',
        lineNumber: 10,
      })
    );

    service.validate('', 'json');
    expect(service.validate).toHaveBeenCalled();
  });
});
