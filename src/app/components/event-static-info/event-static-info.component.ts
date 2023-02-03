import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import 'add-to-calendar-button';

@Component({
  selector: 'app-event-static-info',
  templateUrl: './event-static-info.component.html',
  styleUrls: ['./event-static-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventStaticInfoComponent implements OnInit {
  @Input() guestFirstName? = ''; // decorate the property with @Input()
  //guestFirstName?: string;
  constructor() { }

  ngOnInit(): void {
  }

}
