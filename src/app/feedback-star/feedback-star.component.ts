import { Component, OnInit, HostListener, ElementRef, ChangeDetectionStrategy, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { FeedbackDialogComponent } from './feedback-dialog';
import UserAgentUtil from '../utils/useragent';
import { FeedbackParam } from './feedback';

@Component({
  selector: 'app-feedback-star',
  templateUrl: './feedback-star.component.html',
  styleUrls: ['./feedback-star.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackStarComponent implements OnInit {
  private startUnchecked = 'star_border';
  private startChecked = 'star';
  clicked = false;
  totalStars = 5;
  stars: string[] = [];
  feedbackParam: FeedbackParam;

  @Input() slack?: string;
  @Input() url?: string;

  constructor(
    private elementRef: ElementRef,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    for (let i = 0; i < this.totalStars; i++) {
      this.stars.push(this.startUnchecked);
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOut(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.reset();
      this.clicked = false;
    }
  }

  enterStar(index) {
    for (let i = 0; i < index + 1; i++) {
      this.stars[i] = this.startChecked;
    }
    for (let j = index + 1; j < this.stars.length; j++) {
      this.stars[j] = this.startUnchecked;
    }
  }

  // leaveStar() {
  //   for (let i = 0; i < this.totalStars; i++) {
  //     this.stars[i] = this.startUnchecked;
  //   }
  // }

  reset() {
    for (let i = 0; i < this.totalStars; i++) {
      this.stars[i] = this.startUnchecked;
    }
  }

  clickStar(index) {
    for (let i = 0; i < index + 1; i++) {
      this.stars[i] = this.startChecked;
    }
    for (let j = index + 1; j < this.stars.length; j++) {
      this.stars[j] = this.startUnchecked;
    }
    this.clicked = true;
    const rating = index + 1;
    this.openDialog(rating);
  }

  openDialog(rate: number): void {
    this.feedbackParam = {
      location: location.href,
      rating: rate,
      message: '',
      device: UserAgentUtil.getDevice(),
      os: '',
      browser: UserAgentUtil.getBrowser(),
      language: UserAgentUtil.getLanguage(),
      capture: '',
      slack: this.slack,
      url: this.url
    };

    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      width: '360px',
      disableClose: true,
      data: this.feedbackParam
    });

    dialogRef.afterClosed().subscribe(
      result => {
        console.log('afterClosed result: ', result);
      },
      error => {
        console.log('afterClosed result: ', error);
      }
      );
  }

}

