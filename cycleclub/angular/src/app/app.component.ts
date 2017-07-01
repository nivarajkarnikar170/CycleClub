import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MessageService } from './service/message.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
    socket:any;
    emergencyMsgs:any=[];
    user:any;
    constructor(private messageService: MessageService) {
        
        let localUser = JSON.parse(localStorage.getItem('profile'));

        this.user = {
            email:localUser.email,
            user_id:localUser.identities[0].user_id,
            name:localUser.name
        }
    }

    ngOnInit() {



        console.log("subscribing to socket message..");
        this.socket = this.messageService.getMessages().subscribe(msg => {
            console.log("=======================get message..");
            console.dir(msg);
            if(msg.type=="stop"){
              console.log("stoping emergency...");
              console.log(msg);
              let newArr = this.emergencyMsgs.filter(e=>{
                        console.log("inside filer");
                        console.log(e);
                        return e.event['event']._id!==msg.event._id;
                });
              console.log(newArr);
              this.emergencyMsgs = newArr;
            }
            else if(msg.event['event'].owner.email== this.user.email||
                    msg.event['event'].club_members.filter((e)=> e.email == this.user.email).length > 0) {
                console.log("pushing the emergency..");
                this.emergencyMsgs.push(msg);
     
            }
            console.dir(this.emergencyMsgs);
        });
    }

}
