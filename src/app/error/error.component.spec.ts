import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';


xdescribe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  const $ = require('jquery');
  const window: string[] = [];
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ ErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should ngOnInit called', () => {
    spyOn(component, 'letterHighlight').and.returnValue(true);
    component.ngOnInit();
    expect(component.letterHighlight).toHaveBeenCalled();
  });
  it('should letterHighlight called', () => {

    spyOn($('.one'), 'addClass').and.callThrough();
    const mockDom = '<li class="one">4</li>';
    component.letterHighlight();
  });
});
