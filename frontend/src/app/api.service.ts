import { User } from './models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

   token:string;
   user:User;
  private BASE_URL:String = 'https://tie-in-back.herokuapp.com/v1/';
  constructor(private http:HttpClient, private router:Router) {
    this.loadStorage();
  }


  //login
  login(user:User){
    return this.http.post(this.BASE_URL+ 'login', user)
        .pipe(
            map((res:any)=>{
              this.saveStorage(res.token,res.user);
              this.router.navigateByUrl('');
              Swal.fire('Ingreso exitoso','','success');
              return true;
            }),
            catchError((err)=>{
              Swal.fire(err.error.msj,'','error');
              return throwError(err);
            })
        );
  }

  //logout
  logout(){
    this.clearStorage();
    this.router.navigateByUrl('logout');
  }

  //register a new user
  postUser(user:User){
    return this.http.post(this.BASE_URL+ 'users', user)
        .pipe(
            map((res:any)=>{
              Swal.fire('El usuario se ha registrado con exito','','success');
              return true;
            }),
            catchError((err)=>{
              Swal.fire(err.error.msj,'','error');
              return throwError(err);
            })
        );
  }

  //SAVE DATA ON LOCAL STORAGE
  saveStorage(token:string, user:User){
    
    if (localStorage.getItem('token')) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    localStorage.setItem('user',JSON.stringify(user));
    localStorage.setItem('token',token);
    
    this.user = user;
    this.token = token;
   
  }

  //LOAD DATA FROM STORAGE
  loadStorage(){

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    }else{
      this.token = '';
      this.user = null;
    }
  }

  //CLEAR DATA FROM STORAGE
  clearStorage(){
    localStorage.clear();
    sessionStorage.clear();
    this.token = '';
    this.user = null;
  }

}
