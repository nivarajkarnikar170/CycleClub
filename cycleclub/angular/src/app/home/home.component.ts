import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router, RouterModule } from '@angular/router';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { LocationService } from '../common/location.service';
import { GetMarkerService } from '../common/getMarker.service';

// declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',]
})
export class HomeComponent implements OnInit {
  jwt: string;
  decodedJwt: string;
  response: string;
  name: string;
  // api: string;
  location: {};
  long: any;
  lat: any;
  newLong: any;
  newLat: any;
  user: any;
  constructor(public router: Router,
    public http: Http,
    public authHttp: AuthHttp,
    private locationService: LocationService,
    private getMarker: GetMarkerService) {
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwt && new JwtHelper().decodeToken(this.jwt);
    // this.visible=false;
    this.name = JSON.parse(localStorage.getItem('profile')).name;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    }

    let localUser = JSON.parse(localStorage.getItem('profile'));
    console.log(localUser);

    this.user = {
        email:localUser.email,
        user_id:localUser.identities[0].user_id,
        name:localUser.name
    }
  }

  setPosition(position) {
    this.location = position.coords;
    this.long = this.location['longitude'];
    this.lat = this.location['latitude'];
    this.newLong = this.long;
    this.newLat = this.lat;
    this.locationService.location.long = this.long;
    this.locationService.location.lat = this.lat;
  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['login']);
  }

  // callAnonymousApi() {
  //   this._callApi('Anonymous', 'http://localhost:4200/api/random-qoute');
  // }

  // callSecureApi() {
  //   this._callApi('Secured', 'http://localhost:4200/api/protected/random-qoute');
  // }

  // _callApi(type, url) {
  //   this.response = null;
  //   if (type === 'Anonymous') {
  //     this.http.get(url).subscribe(
  //       response => this.response = response.text(),
  //       error => this.response = error.text()
  //     );
  //   }

  //   if (type === 'secured') {
  //     this.authHttp.get(url).subscribe(
  //       response => this.response = response.text(),
  //       error => this.response = error.text()
  //     );
  //   }
  // }

  listEvents(type){
    this.router.navigate(['home','events'],
      {queryParams:{long:this.long,lat:this.lat,type:type,email:this.user.email}}
    );
  }

  // listLiveEvents(){
  //   this.router.navigate(['home','events','live'],{queryParams:{long:this.long,lat:this.lat}});
  // }

  ngOnInit() {
    this.getMarker.add_marker.subscribe(marker => {
      this.newLat = marker.lat;
      this.newLong = marker.long;
    });
  }
}
