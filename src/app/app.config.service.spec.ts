import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ConfigService } from './app.config.service';
describe('ConfigService', () => {
  let service: ConfigService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConfigService]
    });
    service = TestBed.get(ConfigService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('getConfig', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.get(HttpTestingController);
      service.getConfig().subscribe(res => {

        expect(res).toEqual('');
        const req = httpTestingController.expectOne('../assets/config.json');
        expect(req.request.method).toEqual('GET');
        req.flush(res);
      });

     // httpTestingController.verify();
    });
  });
});
