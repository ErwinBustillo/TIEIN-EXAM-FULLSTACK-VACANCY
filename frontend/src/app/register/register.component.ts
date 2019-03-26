import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form:FormGroup;
  constructor(private api:ApiService, private router:Router,private fb:FormBuilder) {
    this.form = this.fb.group({
       name: fb.control('',[Validators.required]),
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
    this.api.postUser(this.form.value).subscribe();
  }

}
