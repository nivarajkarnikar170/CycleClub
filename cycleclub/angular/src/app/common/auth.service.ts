import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { ReverseLocationService } from './reverselocation.service';
import { Location } from './location.model';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
    lock = new Auth0Lock('qp1I2A6tRMvirPXwayzOqh7Jimn0C1gH', 'andyphuctran.auth0.com');
    // location: {};
    // long: any;
    // lat: any;
    constructor(private router: Router, public http: Http, private reverseLocation: ReverseLocationService) {
        this.lock.on('authenticated', (authenResult: any) => {
            localStorage.setItem('id_token', authenResult.idToken);
            this.lock.getProfile(authenResult.idToken, (error: any, profile: any) => {
                if (error) {
                    console.log(error);
                    return false;
                };
                reverseLocation.getGeoLocation().then((location: Location) => {
                    let userBody = {
                        name: profile.name,
                        email:profile.email,
                        city: location.city,
                        state: location.state,
                        image: profile.picture,
                        user_id: profile.identities[0].user_id,
                        long: location.long,
                        lat: location.lat
                    }
                    http.post('http://localhost:3000/users', userBody).subscribe(() => {
                        localStorage.setItem('profile', JSON.stringify(profile));
                        this.router.navigateByUrl('/home');
                    });
                });
            });
            this.lock.hide();
        });
    }

    // setPosition(position) {
    //     this.location = position.coords;
    //     this.long = this.location['longitude'];
    //     this.lat = this.location['latitude']
    //     this.reverseLocation.getGeoLocation(this.long, this.lat);
    // }

    login() {
        this.lock.show();
    }

    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        this.router.navigateByUrl('/login');
    }

    loggedIn() {
        return tokenNotExpired('id_token');
    }
}