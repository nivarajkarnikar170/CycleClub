import { Component } from '@angular/core';
import { FormArray, FormGroup, FormsModule, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { user } from './user.model';
import { club } from './club.model';
import { LocationService } from '../common/location.service';
import { ReverseLocationService } from '../common/reverselocation.service';
import { Location } from '../common/location.model';

@Component({
  selector: 'app-new-club',
  templateUrl: './new-club.component.html',
  styleUrls: ['./new-club.component.css']
})
export class NewClubComponent {
  myForm: FormGroup;
  name: FormControl;
  image: FormControl;
  users: user[] = [];
  location: any;
  subsciption: Subscription;
  body: any;
  // club:{
  //   name: "",
  //   location: {
  //       type: "Point",
  //       coordinates: [0,0]
  //   },
  //   state: "",
  //   city: "",
  //   image: "",
  //   users: "",
  //   events:"",
  //   announcements:""
  // }
  constructor(private fb: FormBuilder,
    private locationService: LocationService,
    private reverseLocation: ReverseLocationService,
    private http: Http,
    private router: Router) {
    this.name = new FormControl('', [Validators.required]);
    this.image = new FormControl('', [Validators.required]);
    this.myForm = fb.group({
      name: this.name,
      image:this.image
    });
    let profile = JSON.parse(localStorage.getItem('profile'));
    let user_id = JSON.parse(localStorage.getItem('profile')).identities[0].user_id;
    this.users.push(new user(profile.name, profile.email, profile.picture, user_id));
    this.location = {
      type: "Point",
      coordinates: [
        locationService.location.long,
        locationService.location.lat
      ]
    }
    let events = [];
    let announcements = [];
    reverseLocation.getGeoLocation().then((location: Location) => {
      this.body = {
        name: "",
        location: this.location,
        address:location.address,
        street:location.street,
        state: location.state,
        city: location.city,
        image: "",
        users: this.users,
        events: events,
        announcements: announcements
      }
    })


  }

  onSubmit() {
    this.router.navigate(['home']);
    this.body.name = this.myForm.value.name;
    this.body.image = this.myForm.value.image;
    this.http.post('http://localhost:3000/newclub', this.body).subscribe(
      () => { console.log("get clubs near by successful"); }
    );
  }


}
