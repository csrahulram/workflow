import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '../../abstracts/abstract-component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent extends AbstractComponent implements OnInit {
  constructor() {
    super();
  }
  ngOnInit() {}
}
