import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class EventService {
  host='http://localhost:3000/';
  constructor(private http:Http) { }

  getEvents(query){

    console.log("===inside eventserviec");
    console.dir(query);
    return this.http.get(this.host+'events?type='+query.type+
    '&long='+query.long+'&lat='+query.lat+'&email='+query.email);
  }

  joinEvent(user,event_id){

    let body = {user:user,event_id:event_id};
    return this.http.post(this.host+'events/join',body);

  }

  getEventById(event_id){
    return this.http.get(this.host+'events/id?id='+event_id);
  }

  statusEvent(event_id,status){

    let body = {event_id:event_id,status:status};
    return this.http.post(this.host+'events/status',body);
  }

  updateLocation(event_id,long,lat){
    let body = {
      id:event_id,
      long:long,
      lat:lat
    };
    return this.http.post(this.host+'events/updateLocation',body);
  }
}
