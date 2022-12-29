import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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




  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }

  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]]
  })

  login() {

    var acno = this.loginForm.value.acno
    var psw = this.loginForm.value.psw

  //   if (this.loginForm.valid) {

  //     this.ds.login(acno, psw).subscribe((result: any) => {

  //       localStorage.setItem('currentacno', JSON.stringify(result.currentAcno))
  //       localStorage.setItem('currentuser', JSON.stringify(result.currentUser))
  //       localStorage.setItem('token', JSON.stringify(result.token))

  //       alert(result.message)
  //       this.router.navigateByUrl('dashboard')
  //     },
  //       result => {
  //         alert(result.error.message)
  //       }
  //     )

  //   }
  //   else {
  //     alert('invalid form')
  //   }
  // }


  if(this.loginForm.valid){

    const result = this.ds.login(acno, psw)
    if (result){
      alert('login success')
      this.router.navigateByUrl('dashboard')

    }
    else {
      alert('incorrect username or password')
    }
  }
  else{
    alert('invalid form')
  }
  }

}

