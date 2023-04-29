import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { guestEM } from '../../models/guestEM';
import { environment } from 'src/environments/environment';

import { default as secrets } from 'src/environments/extra.json';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  inviteCode$?: string;
  guestName$?: string
      
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {

  }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      let inviteCodeParam = params['code'];
      if (inviteCodeParam){
        const headers = {
          'X-API-KEY': secrets['ApiKey_inviteCode'],
        }
        this.inviteCode$ = inviteCodeParam;
        const codeToNameAPI = `${environment.invitecodeToNameBaseUrl}/invite_code/${this.inviteCode$}`;
        this.http.get<guestEM>(codeToNameAPI, {headers}).subscribe(guest => {
          this.guestName$ = guest.firstName;
        })
      }
      
    });
  }

}
