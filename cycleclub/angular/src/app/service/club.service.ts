import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ClubService {
  baseUrl: string = "http://localhost:3000/club/detail/"
  constructor(private http: Http) { }

  getClubDetails(id){
    return this.http.get(this.baseUrl + id);    
  } 

  addAnnouncements(data){ 
    return this.http.post(this.baseUrl + 'announcement', data); 
  }

  addEvent(data){      
      return this.http.post(this.baseUrl + 'event', data);    
  } 

  getMemberDetails(id){     
    return this.http.get(this.baseUrl + 'member/' + id);    
  }

  getLocationByUserId(id){    
    return this.http.get(this.baseUrl + 'location/' + id);
  } 

}
