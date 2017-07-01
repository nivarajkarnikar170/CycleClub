import { Component, OnInit, OnDestroy, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { GeolocationService } from '../../service/geolocation.service';
import { EventService } from '../../service/event.service';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html'
})
export class EventDetailComponent implements OnInit,OnDestroy {

  @Input() event:any;
  @Input() isOwner:boolean;
  @Input() user:any;
  timer:any;
  isSimulate:boolean=false;
  startBtnLabel = "Start Trip";
 
  constructor(private geolocation:GeolocationService,
    private eventService:EventService,
     private messageService:MessageService) {

  }


  ngOnInit() {

    console.log("isOwner.."+this.isOwner);
    if(this.event.status=='started'){

      this.updateLocation();
    }
    
  }

  ngOnDestroy(){
    console.log("destroyed event..");
    clearInterval(this.timer);
  }

  startTrip(){

    let status = 'started';
    let prevStatus = this.event.status;
    this.eventService.statusEvent(this.event._id,status).subscribe(
      (response)=>{
        
        if(prevStatus=='emergency'){
          console.log("stopping emergency");
          this.messageService.stopEmergency(this.event);

        }

          this.event.status=status;
          this.event.date_started=response.text();
          this.updateLocation();
      }
    );
  
  }

  join(){

    this.eventService.joinEvent(this.user,this.event._id).subscribe(
      (data)=>{
          console.log("subscribing to post request pushing to members..");
          console.log(data);
          if(!this.event.members){
            this.event.members=[];
          }
          this.event.members.push(this.user);
          console.log(this.event.members);
      }
    );   
  }

  endTrip(){
    let status = 'ended';
    let prevStatus = this.event.status;
    this.eventService.statusEvent(this.event._id,status).subscribe(
      (result)=>{

        if(prevStatus=='emergency'){
          console.log("stopping emergency");
          this.messageService.stopEmergency(this.event);
        }

        this.event.status=status;
        this.event.date_ended=result.text();
        clearInterval(this.timer);
      }
    );
  }

  emergency(){

    let status = 'emergency';
    let txt = "Emergency Stop for Event:"+ this.event.details+" of Club: "+this.event.club_name;
    let eventMsg = {event:this.event,txt:txt};
    this.messageService.sendMessage(eventMsg);
    this.eventService.statusEvent(this.event._id,status).subscribe(
      (data)=>{
        this.event.status=status;
        this.startBtnLabel="Resume Trip";
      }
    );

  }

  simulate(){
    this.isSimulate=!this.isSimulate;
    console.log("simulation=="+this.isSimulate);
  }


  isDisableStartBtn(){
    return (this.event.status=='started' || this.event.status=='ended' || !this.isOwner);
  }

  isDisableEndBtn(){
    return ((this.event.status!='started' && this.event.status!='emergency') || !this.isOwner);
  }

  isDisableJoinBtn(){

    let isMember = false;
    if(this.event.members){
      for(let m of this.event.members){
        if(this.user.email==m.email){
            isMember=true;
        }
      }

    }

    return (this.isOwner||this.event.status=='ended'||isMember);
  }

  isDisableEmergencyBtn(){
    return (this.event.status!='started' || !this.isOwner);
  }

  getCurrentLocation(){

    this.geolocation.getLocation({enableHighAccuracy:true}).subscribe(
        (position)=>{
          console.log(position.coords);
          this.event.current_location.coordinates[1] = position.coords.latitude;
          this.event.current_location.coordinates[0] = position.coords.longitude;
          this.updateLocationDB();
        },
        (error)=>{console.log(error)},
        ()=>{console.log("completed geolocation...")} 
    );
  }

  updateLocationDB(){
   
      let long = this.event.current_location.coordinates[0];
      let lat = this.event.current_location.coordinates[1];
      this.eventService.updateLocation(this.event._id,long,lat).subscribe(
        (data)=>{
          console.log("location updated...");
        }
      );

  }

  //updates the location every 10 seconds.
  updateLocation(){
    // console.log("updating location..");
    this.timer = setInterval(()=>{
      console.log("updating location.. is isSimulate=="+this.isSimulate);
      if(this.isSimulate){
        this.event.current_location.coordinates[1]+=.0009;
        this.event.current_location.coordinates[0]+=.0009;
        this.updateLocationDB();
      }else{
        if(this.isOwner){
          this.getCurrentLocation();
        }else{

          this.eventService.getEventById(this.event._id).subscribe(
            (data:any)=>{
              let e = data.json();
              this.event.current_location.coordinates[1] = e.current_location.coordinates[1];
              this.event.current_location.coordinates[0] = e.current_location.coordinates[0];
            }
          );
        }
      }

     } 
      ,5000);
  }

}
