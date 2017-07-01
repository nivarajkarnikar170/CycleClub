import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { GetMarkerService } from '../common/getMarker.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {
  long: any;
  lat: any;
  clubs: any;
  // @Output() addMarker = new EventEmitter();

  constructor(private activatedRoute: ActivatedRoute,
    public http: Http,
    public router: Router,
    private getMarker: GetMarkerService) {
    activatedRoute.queryParams.subscribe((params: any) => {
      this.long = params.long;
      this.lat = params.lat;
      let url = 'http://localhost:3000/clubs?long=' + params.long + '&lat=' + params.lat;
      http.get(url).subscribe(
        response => this.clubs = JSON.parse(response['_body'])
      )
    });
  }

  newClub() {
    this.router.navigate(['home', 'newclub']);
  }

  isOwner(club) {
    let user_id = JSON.parse(localStorage.getItem('profile')).identities[0].user_id;
    if (club.users.length === 0)
      return false;
    else {
      for (let i = 0; i < club.users.length; i++) {
        if (club.users[i].user_id === user_id)
          return true;
      }
      return false;
    }
  }

  changeMarker(club){
    let marker = {
      long: club.location.coordinates[0],
      lat: club.location.coordinates[1]
    }
    console.log(marker);
    console.log(club);
    this.getMarker.addMarker(marker);
  }

  setClickedRow(club) {
    // let marker = {
    //   long: club.location.coordinates[0],
    //   lat: club.location.coordinates[1]
    // }
    // console.log(marker);
    // console.log(club);
    // this.getMarker.addMarker(marker);
    this.router.navigateByUrl('/club/detail/'+club._id);
  }

  insertUserToClub(club_id) {
    let profile = JSON.parse(localStorage.getItem('profile'));
    let body = {
      club_id: club_id,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
      user_id: profile.identities[0].user_id
    }
    console.log(body);
    this.http.post('http://localhost:3000/insertUser', body).subscribe(
      () => this.router.navigateByUrl('/home/complete')
    );
  }
  removeUserFromClub(club_id) {
    let profile = JSON.parse(localStorage.getItem('profile'));
    let body = {
      club_id: club_id,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
      user_id: profile.identities[0].user_id
    }
    console.log(body);
    this.http.post('http://localhost:3000/removeUser', body).subscribe(
      () => this.router.navigateByUrl('/home/complete')
    );
  }

  ngOnInit() {
  }

}
