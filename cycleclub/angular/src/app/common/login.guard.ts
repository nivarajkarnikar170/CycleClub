import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class LoginGuard implements CanActivate{
    constructor(private router:Router){}
    canActivate(){
        if(tokenNotExpired('id_token')){
            this.router.navigate(['home']);
            return false;
        }
        // this.router.navigate(['/login']);
        return true;
    }
}