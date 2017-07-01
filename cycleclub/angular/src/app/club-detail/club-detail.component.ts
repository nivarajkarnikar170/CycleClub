import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from '../service/club.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.css']
})
export class ClubDetailComponent implements OnDestroy {

  user_email: string;
  receiver_email: string;
  userName: string;
  clubId: number;
  subscription: Subscription;
  clubDetails: any;
  addEvent: boolean = false;
  addAnnouncement: boolean = false;
  displayReceiverEmail: string;
  clearMessage: boolean = false;
  child_message:any;

  constructor(private route: ActivatedRoute, private clubService: ClubService, private router: Router) {

    this.user_email = JSON.parse(localStorage.getItem('profile')).email;
    this.userName = JSON.parse(localStorage.getItem('profile')).name;
    //console.log(JSON.parse(localStorage.getItem('profile')));
    this.subscription = route.params.subscribe(params => { 
      this.clubId = params['id'];
      localStorage.setItem('currentClubId', this.clubId.toString() ); 
    });
    clubService.getClubDetails(this.clubId).subscribe(data => { this.clubDetails = data.json(); console.log(this.clubDetails); });
  }

  onAddEvent(cid) {
    this.addEvent = true;
    this.addAnnouncement = false;
  }

  onAddAnnouncement(cid) {
    this.addAnnouncement = true;
    this.addEvent = false;
  }

  eventAdded(val) {
    this.clubDetails.events.push({ name: val.details, status: val.status, owner: {name:val.owner.name } });
  }

  isOwner(email){
    return this.user_email==email;
  }

  announcementAdded(val) {
    this.clubDetails.announcements.push({
      details: val.details,
      createdBy: { name: val.createdBy.name, email: val.createdBy.email }
    });
  }

  onChatStart(receiverEmail) {
    // console.log('onChatStart');
    // console.log(this.user_email);
    // console.log(receiverEmail);
    this.receiver_email = receiverEmail;
    this.displayReceiverEmail = receiverEmail;
    this.clearMessage = true;
    this.child_message = [];
  }

  logout(){
    localStorage.removeItem('id_token');
    this.router.navigate(['login']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
