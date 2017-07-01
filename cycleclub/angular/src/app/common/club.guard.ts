import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class CanActivateClubGuard implements CanActivate {
    params: any;
    constructor(private activatedRoute: ActivatedRoute, private router: Router,
                private route:ActivatedRouteSnapshot, private state: RouterStateSnapshot) {
        activatedRoute.params.subscribe(
            (params: any) => this.params = params
        );
    }
    canActivate() {
        if (!this.params){
            console.log(this.route);
            console.log(this.state);
            this.router.navigateByUrl('/home');
            return false;
        }
        console.log(this.route);
            console.log(this.state);
        // this.router.navigateByUrl('/home');
        return true;
    }
}