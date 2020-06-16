import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare var $:any
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor() { }
  classes = [];
  length = 15;

  ngOnInit(): void {
    this.select(0);
  }

  select(i) {
    if (i < this.length) {
      setTimeout(() => {
        this.classes[i] = 'selected';
        this.select(i + 1);
      }, 500);
    }
  }
}
