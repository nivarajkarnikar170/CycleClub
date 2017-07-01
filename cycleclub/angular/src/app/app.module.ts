import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './common/auth.service';
import { AuthGuard } from './common/auth.guard';
import { LoginGuard } from './common/login.guard';
import { CanActivateAddClubGuard } from './common/addclub.guard';
// import { CanActivateClubGuard } from './common/club.guard';
import { ReverseLocationService } from './common/reverselocation.service';
import { LocationService } from './common/location.service';
import { GetMarkerService } from './common/getMarker.service';
import { Router, RouterModule } from '@angular/router';
import { routes } from './app.route';
import { ClubsComponent } from './clubs/clubs.component';
import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component'
import { NewClubComponent } from './new-club/new-club.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { ClubService } from './service/club.service';
import { CompleteComponent } from './complete/complete.component';
import { AddeventComponent } from './addevent/addevent.component';
import { AddanouncementComponent } from './addanouncement/addanouncement.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { MessageService } from './service/message.service';
import { EventService } from './service/event.service';
import { GeolocationService } from './service/geolocation.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ClubsComponent,
    EventsComponent,
    NewClubComponent,
    EventDetailComponent,
    CompleteComponent,
    ClubDetailComponent,
    AddeventComponent, AddanouncementComponent, ProfileComponent, ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,
    routes,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBxlmU0wfFDU_wZUeO1e_HDW5-c52WkcVo'

    })
  ],
  providers: [
    GetMarkerService,
    LocationService,
    ReverseLocationService,
    AuthGuard,
    AuthService,
    LoginGuard,
    ClubService,
    CanActivateAddClubGuard,
    MessageService,
    EventService,
    GeolocationService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
