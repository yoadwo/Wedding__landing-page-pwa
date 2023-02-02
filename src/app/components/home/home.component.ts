import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { guestEM } from '../../models/guestEM';

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
      let inviteCodeParam = params['invite_code'];
      if (inviteCodeParam){
        this.inviteCode$ = inviteCodeParam;
        const codeToNameAPI = `https://zhzd7fvjp9.execute-api.us-east-1.amazonaws.com/dev/invite_code/${this.inviteCode$}`;
        this.http.get<guestEM>(codeToNameAPI).subscribe(guest => {
          this.guestName$ = guest.firstName;
        })
      }
      
    });
  }

}
