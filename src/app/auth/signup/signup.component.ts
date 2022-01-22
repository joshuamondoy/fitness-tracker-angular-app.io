import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
maxDate : Date;
  constructor() { }

  ngOnInit() {
  this.maxDate = new Date();
  this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  onSubmit(data : NgForm) {
    const value = data.value
    console.log(value.email, value.password, value.birthdate, value.agree);
    
  }

}