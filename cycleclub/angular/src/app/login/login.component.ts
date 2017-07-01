import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {AuthService} from '../common/auth.service';
import {contentHeaders} from '../common/headers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public http:Http, public router:Router, private auth:AuthService) { }

  // login(event, username, password){
  //   event.preventDefault();
  //   let body=JSON.stringify({username, password});
  //   this.http.post('http://localhost:4200/sessions/create',body,{headers:contentHeaders})
  //     .subscribe(
  //       response =>{
  //         localStorage.setItem('id_token', response.json().id_token);
  //         this.router.navigate(['home']);
  //       },
  //       error => {
  //         alert(error.text());
  //         console.log(error.text());
  //       }
  //     );
  // }
  // signup(){
  //   event.preventDefault();
  //   this.router.navigate(['signup']);
  // }
}
