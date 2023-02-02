import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { guestRsvp, rsvp } from '../../models/guestRsvp';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'

@Component({
  selector: 'app-status-select',
  templateUrl: './status-select.component.html',
  styleUrls: ['./status-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusSelectComponent implements OnInit {
  @Input() guestInviteCode? = ''; // decorate the property with @Input()
  rsvpType = rsvp;
  guestStatus: guestRsvp;

  constructor(
    private http: HttpClient
  ) {
    this.guestStatus = {
      inviteCode: "",
      attending : 0,
      status: rsvp.maybe
    }
   }

  ngOnInit(): void {
  }

  incAttending() {
    this.guestStatus.attending++;
  }

  decAttending() {
    if (this.guestStatus.attending != 0){
      this.guestStatus.attending--;
    }
  }

  updateStatus(status: rsvp){
    this.guestStatus.inviteCode = this.guestInviteCode!;
    this.guestStatus.status = status;
    this.updateGuestsList(this.guestStatus);
  }

  updateGuestsList(guestStatus: guestRsvp) {
    const codeToNameAPI = `https://r5wele8vrf.execute-api.us-east-1.amazonaws.com/dev/update-guest-rsvp/${this.guestStatus.inviteCode}`;
        this.http.post<guestRsvp>(codeToNameAPI, guestStatus).subscribe(json => {
          alert('נתראה בחתונה!');
      })
  }

}
