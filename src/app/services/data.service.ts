import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// global overloading headers
const option={
  headers:new HttpHeaders()

}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentuser = ''
  currentacno = ''

  constructor(private http:HttpClient) {
    
   }

  // savedetails(){
  //   if(this.userDetails){
  //     localStorage.setItem("database",JSON.stringify(this.userDetails))
  //   }
  //   if(this.userDetails){
  //     localStorage.setItem("currentuser",JSON.stringify(this.currentuser))
  //   }
  //   if(this.userDetails){
  //     localStorage.setItem("currentacno",JSON.stringify(this.currentacno))
  //   }

  // }

  // getdetails(){
  //   if(localStorage.getItem('database')){
  //     this.userDetails=JSON.parse(localStorage.getItem('database') ||'')
  //   } 
  //   if(localStorage.getItem('currentuser')){
  //     this.userDetails=JSON.parse(localStorage.getItem('currentuser') ||'')
  //   }
  //   if(localStorage.getItem('currentacno')){
  //     this.userDetails=JSON.parse(localStorage.getItem('currentacno') ||'')
  //   } 

  // }

  userDetails: any = {
    1000: { acno: 1000, username: "anu", password: 123, balance: 0, transaction: [] },
    1001: { acno: 1001, username: "amal", password: 123, balance: 0, transaction: [] },
    1002: { acno: 1002, username: "arun", password: 123, balance: 0, transaction: [] },
    1003: { acno: 1003, username: "mega", password: 123, balance: 0, transaction: [] }
  }

  // gettoken(){
  //   const token=JSON.parse(localStorage.getItem('token') || '')

  //   let headers=new HttpHeaders()

  //   if(token){
  //    option.headers=headers.append('access-token',token)
  //   }

  //   return option

  // }

  register(acno: any, uname: any, psw: any) { 
    // const data={
    //   acno,uname,psw
    // }
    // return this.http.post('http://localhost:3000/register',data)
    
    
    var userDetails = this.userDetails
    if (acno in userDetails) {
      return false
    }
    else {
      userDetails[acno] = { acno, username: uname, password: psw, balance: 0, transaction: [] }
      return true
    }
  }
  login(acno: any, psw: any) {

    // const data={
    //   acno,psw
    // }
    // return this.http.post('http://localhost:3000/login',data)


    var userDetails = this.userDetails

    if (acno in userDetails) {
      if (psw == userDetails[acno]["password"]) {

        // acnumber
        this.currentacno = acno

        // store username
        this.currentuser = userDetails[acno]["username"]

        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }

  }

  deposit(acno: any, password: any, amount: any) {
    
  //   const data={
  //     acno, psw: password, amount
  //   }
  //   return this.http.post('http://localhost:3000/deposit',data,this.gettoken())

    
    var userDetails = this.userDetails
    var amnt = parseInt(amount)
    if (acno in userDetails) {
      if (password == userDetails[acno]["password"]) {
        userDetails[acno]["balance"] += amnt
        userDetails[acno]["transaction"].push({ type: 'CREDIT', amount: amnt })
        return userDetails[acno]["balance"]
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }

  withdraw(acno: any, password: any, amount: any) {
    
    // const data={
    //   acno, psw: password, amount
    // }
    // return this.http.post('http://localhost:3000/withdraw',data,this.gettoken())

   
   
    var userDetails = this.userDetails
    var amnt = parseInt(amount)
    if (acno in userDetails) {
      if (password == userDetails[acno]["password"]) {
        if (amnt <= userDetails[acno]["balance"]) {
          userDetails[acno]["balance"] -= amnt
          userDetails[acno]["transaction"].push({ type: 'DEBIT', amount: amnt })
          return userDetails[acno]["balance"]
        }
        else {
          alert('insufficient balance')
          return false
        }
      }
      else {
        alert('incorrect password')
        return false
      }
    }
    else {
      alert('incorrect ac no')
      return false
    }

  }

  gettransaction(acno: any) {
    // const data={
    //   acno
    // }
    // return this.http.post('http://localhost:3000/transaction',data,this.gettoken())


    return this.userDetails[acno]['transaction']
  }

}
