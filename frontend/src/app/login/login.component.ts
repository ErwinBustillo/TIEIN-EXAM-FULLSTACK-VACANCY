import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  constructor(private api:ApiService, private router:Router,private fb:FormBuilder) {
    this.form = this.fb.group({
       email: fb.control('', [Validators.required,Validators.email]),
       password: fb.control('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit() {

  }

  onSubmit(){
    if (this.form.invalid) {
      return;
    }
    this.api.login(this.form.value).subscribe();
  }

}
