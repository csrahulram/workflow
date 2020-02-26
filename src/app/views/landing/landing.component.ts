import { Component, OnInit } from '@angular/core';
import { AbstractView } from 'src/app/shared/abstracts/abstract-view';

@Component({
  selector: 'app-landing-view',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingViewComponent extends AbstractView implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
