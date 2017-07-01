import { Component, OnInit } from '@angular/core';
import { ClubService } from '../service/club.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { GeolocationService } from '../service/geolocation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  details: JSON;
  displayDetails: JSON;
  uid: number;
  subscription: Subscription;
  courseId: string;

  constructor(private clubService: ClubService, private route: ActivatedRoute) {
    this.subscription = route.params.subscribe(params => { this.uid = params['id']; });
    this.clubService.getMemberDetails(this.uid).subscribe(data => {
      this.details = data.json();
      this.displayDetails = this.details[0];
      this.courseId = localStorage.getItem('currentClubId');
      localStorage.removeItem('currentClubId');
      //console.log(this.displayDetails);
    });
  }

  ngOnInit() {
  }
}
