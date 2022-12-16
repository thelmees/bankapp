import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  aim = "YOUR PERFECT BANKING PARTNER"
  data = "enter ac number"
  acno = ''
  psw = ''




  constructor(private router: Router, private ds: DataService) { }


  login() {

    var acno = this.acno
    var psw = this.psw

    const result = this.ds.login(acno, psw)
    if (result){
      alert('login success')
      this.router.navigateByUrl('dashboard')

    }
    else {
      alert('incorrect username or password')
    }
  }
}
