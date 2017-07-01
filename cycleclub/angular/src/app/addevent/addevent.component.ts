import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
//import { EventService } from '../services/event.service';
import { ClubService } from '../service/club.service';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {

  @Input() owner;
  @Input() cid: number;
  @Input() clubDetails: any;
  @Output() eventAdded = new EventEmitter();
  eventAddedFlag: boolean = false;

  user_id: number;
  profile: JSON;

  event = { eventName: '' };

  constructor(private clubService: ClubService) { }

  onCreateEvent(form) {
    //console.log(form.value);
    //add events to events collection and club collection
    this.user_id = JSON.parse(localStorage.getItem('profile')).identities[0].user_id;

    //get location from userId
    console.log(this.user_id);
    this.clubService.getLocationByUserId(this.user_id).subscribe(data => {
      //building data to sent
      var dt = {
        cid: this.cid,
        details: form.value.eventName,
        status: 'not started',
        current_location: data.json().location,
        owner: {
          name: data.json().name,
          email: data.json().email,
          user_id: this.user_id
        },
        club_name: this.clubDetails.name,
        club_members: this.clubDetails.users
      }
      //console.log(dt);
      this.eventAddedFlag = true;
      this.clubService.addEvent(dt).subscribe(data => console.log(data));
      this.event.eventName = '';
      this.eventAdded.emit(dt);

    });
  }

  onInputInsert() {
    this.eventAddedFlag = false;
  }
  ngOnInit() {
  }

}
