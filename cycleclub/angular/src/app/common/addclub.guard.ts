import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

@Injectable()
export class CanActivateAddClubGuard implements CanActivate{
    canActivate(){
        return confirm("Are you sure ?")
    }
}