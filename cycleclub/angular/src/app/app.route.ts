import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ClubsComponent } from './clubs/clubs.component';
import { NewClubComponent } from './new-club/new-club.component';
import { CompleteComponent } from './complete/complete.component';
import { AuthGuard } from './common/auth.guard';
import { LoginGuard } from './common/login.guard';
import { CanActivateAddClubGuard } from './common/addclub.guard';
// import { CanActivateClubGuard } from './common/club.guard';

import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EventsComponent } from './events/events.component';
import { AddeventComponent } from './addevent/addevent.component';
import { AddanouncementComponent } from './addanouncement/addanouncement.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';


const myroutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'complete', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent, canActivate: [AuthGuard],
        children: [
            { path: 'clubs', component: ClubsComponent },
            { path: 'events', component: EventsComponent },
            { path: 'newclub', component: NewClubComponent },
            { path: 'complete', component: CompleteComponent, canActivate: [CanActivateAddClubGuard] }
        ]
    },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'event/detail', component: EventDetailComponent },
    { path: 'events', component: EventsComponent },
    { path: 'club/detail/:id', component:ClubDetailComponent},
    { path: 'profile/:id', component:ProfileComponent},
    { path: 'chat', component:ChatComponent},

    
    { path: '**', component: LoginComponent }
];

export const routes = RouterModule.forRoot(myroutes);
