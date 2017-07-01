import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';


@Injectable()
export class MessageService {
  private url = 'http://localhost:3000';  
  private socket;
  
  sendMessage(message){
    console.log("sending message to socket.."+message);
    this.socket.emit('emergency-message', message);    
  }

  stopEmergency(message){
    this.socket.emit('stop-emergency',message);
  }
  
  getMessages() {
    let observable = new Observable<any>(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        console.log(" socket message received from server ="+data);
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  
}





