
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChatService } from '../service/chat.service';

@Component({
  moduleId: module.id,
  selector: 'chat',
  templateUrl: './chat.component.html',
  providers: [ChatService],
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() messages = [];
  connection;
  message;
  messageObj;

  @Input() senderEmail: string;
  @Input() receiverEmail: string;
  @Input() displayReceiverEmail: string; 
  @Input() clearMessage: boolean; 

  constructor(private chatService: ChatService) { }

  sendMessage() {
    this.messageObj = { sender: this.senderEmail, receiver: this.receiverEmail, message: this.message }
    this.chatService.sendMessage(this.messageObj);
    this.message = '';
  }

  ngOnInit() {
    if(this.clearMessage){
      this.messages = [];
    }
    this.connection = this.chatService.getMessages().subscribe(message => {
      //console.log("socket")
      //console.log(message.sender);
      if (message.sender == this.senderEmail || message.receiver == this.senderEmail) {
        this.messages.push(message);
        this.receiverEmail = message.sender;       
      }
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}