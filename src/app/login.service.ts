import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginData = {
      userName: username,
      password: password
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('http://127.0.0.1:5000/login', loginData, httpOptions);
  }

  setToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }
  
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  clearToken() {
    localStorage.removeItem('jwtToken');
  }

  getAllUserData(): Observable<any> {
    const token = this.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get('http://127.0.0.1:5000/', httpOptions);
  }
  
  updateUser(updateData: any, options?: any): Observable<any> {
    const token = this.getToken();
    const defaultOptions = {
      responseType: 'json',
    };
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
      ...defaultOptions,
      ...options,
    };
  
    return this.http.put('http://127.0.0.1:5000/update', updateData, httpOptions);
  }
  
  logout(): Observable<any> {
    this.clearToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`
      })
    };
    return this.http.post('http://127.0.0.1:5000/logout', null, httpOptions);
  }
  
  registerUser(userData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('http://127.0.0.1:5000/add_user', userData, httpOptions);
  }
  
}
