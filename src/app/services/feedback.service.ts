import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { FeedbackParam } from '../feedback-star/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private http: HttpClient,
  ) { }

  sendFeedback(data: FeedbackParam): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
      }),
      responseType: 'text'
    };
    const slackMessage = {
      channel: '#general',
      username: 'Feedback star',
      icon_emoji: ':star:',
      text: 'Received feedback!',
      attachments: [
        {
          color: '#36a64f',
          image_url: 'http://xxx/uploads/monster/image/3/thumb_thany1.jpg',
          fields: [
            {
              title: 'Stars:',
              value: ':star:'.repeat(data.rating),
              short: true
            },
            {
              title: 'Message:',
              value: data.message,
              short: true
            },
            {
              title: 'Location',
              value: data.location,
              short: true
            },
            {
              title: 'Device',
              value: data.device,
              short: true
            },
            {
              title: 'Browser',
              value: data.browser,
              short: true
            }
          ],
          footer: 'Slack API',
          footer_icon: 'https://platform.slack-edge.com/img/default_application_icon.png',
          ts: Math.round((new Date()).getTime() / 1000)
        }
      ]
    };
    return this.http.post<string>(data.slack, slackMessage, httpOptions)
    .pipe(
      timeout(2500),
      catchError(this.handleError),
    );
  }

  private generateSlackMessage() {}


  private handleError(error: HttpErrorResponse) {
    return throwError(error.error);
  }

}
