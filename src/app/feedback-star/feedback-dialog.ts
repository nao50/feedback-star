import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { FeedbackService } from '../services/feedback.service';
import { FeedbackParam } from './feedback';

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: 'feedback-dialog.html',
  styleUrls: ['./feedback-dialog.scss']
})

export class FeedbackDialogComponent {
  submitFlag = false;
  feedbackFormGroup = this.formBuilder.group({
    feedbackMessage: ['', [Validators.required]],
  });

  constructor(
    private feedbackService: FeedbackService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FeedbackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FeedbackParam,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendFeedback() {
    this.submitFlag = true;

    this.data.message = this.feedbackFormGroup.value.feedbackMessage;
    this.data.capture = '';

    setTimeout(() => {
      this.feedbackService.sendFeedback(this.data).subscribe(
        result => {
          this.dialogRef.close(result);
        },
        error => {
          console.log('error: ', error);
          this.dialogRef.close(error);
        }
      );
    });

  }

}
