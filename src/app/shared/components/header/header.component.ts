import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '../../abstracts/abstract-component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends AbstractComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
