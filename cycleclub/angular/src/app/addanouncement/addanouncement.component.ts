import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { ClubService } from '../service/club.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addanouncement',
  templateUrl: './addanouncement.component.html',
  styleUrls: ['./addanouncement.component.css']
})
export class AddanouncementComponent implements OnInit {

  @Input() owner;
  @Input() cid: number;
  @Output() announcementAdded = new EventEmitter();
  user_id: string;
  name: string;
  email: string;
  announcement = { announcementDetail: '' };
  announcementAddedFlag: boolean = false;

  constructor(private clubService: ClubService, private router: Router) {
    this.owner = { name: 'dummy name', email: 'dummy@dummy.com' };
  }

  onCreateAnnouncement(form) {
    this.user_id = JSON.parse(localStorage.getItem('profile')).identities[0].user_id;
    this.name = JSON.parse(localStorage.getItem('profile')).name;
    this.email = JSON.parse(localStorage.getItem('profile')).email;
    console.log(this.cid);
    //insert announcements
    var dt = {};
    dt = {
      cid: this.cid,
      details: form.value.announcementDetail,
      createdBy: { name: this.name, email: this.email }
    }

    this.clubService.addAnnouncements(dt).subscribe(data => {
      this.announcement.announcementDetail = '';
      this.announcementAddedFlag = true;
      this.announcementAdded.emit(dt);
      //this.router.navigate(['clubs', this.cid]);
    });
  }

  onInputInsert() {
    this.announcementAddedFlag = false;
  }

  ngOnInit() {
  }
}
