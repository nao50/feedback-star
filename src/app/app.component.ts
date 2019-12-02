import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FeedbackStarComponent } from './feedback-star/feedback-star.component';

@Component({
  selector: 'app-feedback-star',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private injector: Injector,
  ) {
    const AppFeedbackStarElement = createCustomElement(
      FeedbackStarComponent,
      { injector: this.injector }
    );
    customElements.define('app-feedback-star', AppFeedbackStarElement);
  }
}
