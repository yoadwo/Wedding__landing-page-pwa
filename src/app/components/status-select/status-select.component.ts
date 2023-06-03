import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { guestRsvp, guestRsvpResponse , rsvp } from '../../models/guestRsvp';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

import { default as secrets } from 'src/environments/extra.json';

const promptWhenAccept = 'איזה כיף! נתראה בחתונה';
const promptWhenMaybe = 'לא לשכוח לחזור לכאן ולעדכן אותנו';
const promptWhenDecline =  'כמה חבל! מבטיחים להישאר חברים';

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
    const codeToNameAPI = `${environment.updateGuestRsvpBaseUrl}/update-guest-rsvp/${this.guestStatus.inviteCode}`;
    const headers = {
      'X-API-KEY': secrets['ApiKey_updateGuestRsvp'],
    }
    this.http.post<guestRsvpResponse>(codeToNameAPI, guestStatus, {headers}).subscribe(json => {
      if (json.code < 0){
        Swal.fire({
          text: 'משהו השתבש בתהליך קליטת תגובתכם. אנא פנו ליועד או לשירלי',
          confirmButtonText: 'תודה על תגובתכם',
          confirmButtonColor: '#dea58d'
        })
        return;
      }
      let rsvpResponseText: string;
      switch (this.guestStatus.status){
        case rsvp.yes:
          rsvpResponseText = promptWhenAccept;
          break;
        case rsvp.no:
          rsvpResponseText = promptWhenDecline;
          break;
        case rsvp.maybe:
          rsvpResponseText = promptWhenMaybe;
          break;
      }

      Swal.fire({
        html: `<div style="font-family: 'Assistant', system-ui">${rsvpResponseText}</div>`,
        confirmButtonText: 'תודה על תגובתכם',
        confirmButtonColor: '#dea58d'
      })
  })      
  
  }

}
