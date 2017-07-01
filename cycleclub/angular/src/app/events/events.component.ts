import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../service/event.service';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {
   
  user:{name:string,email:string,user_id:string};

  events:any[];

  constructor(private activatedRoute:ActivatedRoute, private eventService:EventService) {
      // this.user_id=JSON.parse(localStorage.getItem('profile')).identities[0].user_id;
      // let url=activatedRoute;
      // console.log("logging user profile...");
      console.log(JSON.parse(localStorage.getItem('profile')));
      let localUser = JSON.parse(localStorage.getItem('profile'));
      console.log(localUser);

      this.user = {
        email:localUser.email,
        user_id:localUser.identities[0].user_id,
        name:localUser.name
      }


      

   }

  ngOnInit() {


    this.activatedRoute.queryParams.subscribe(
        (params:any) => {
          console.log("==============inside subscribe..");
          console.log('queryParams',params['long']);
          console.log('queryParams', params['type']);
          let query = {
            long : params['long'],
            lat : params['lat'],
            type : params['type'],
            email : params['email']
          };
          this.eventService.getEvents(query).subscribe(
              (data)=>{
                console.log(data.json());
                this.events = data.json();
              }
          );
      
        }
      );



  }


  isOwner(email){
    // console.log("email:"+email+" | loggedEmail:"+loggedEmail);
    return email == this.user.email;
  }

}
