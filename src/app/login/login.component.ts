import { Component } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loggedIn: boolean = false;
  token: string = '';
  userData: any;
  loginUsername: string = '';
  updateSuccessMessage: string = 'UserData updated successfully!';
  updateFailedMessage: string = 'User update failed';
  updateStatus : boolean = false;
  registrationStatus: boolean = true;
  registrationMessage: string = '';
  registerUserData = {
    userName: '',
    password: '',
    birthday: '',
  };
  showRegistrationForm: boolean = false;
  registerSuccessMessage: string = 'Register Success!';


  constructor(
    private loginService: LoginService) {}

  onLogin() {
    this.loginService.login(this.username, this.password).subscribe((response: any) => {
      if (response && response.status === 'success') {
        const token = response.token;
        this.loginService.setToken(token);
        this.loggedIn = true;
  
        this.loginService.getAllUserData().subscribe((userData: any) => {
          console.log(userData);
          this. loginUsername = this.username;
  
          if (userData && userData.users) {
            this.userData = userData;
          }
        });
      } else {
        this.loggedIn = false;
        console.error('Login failed:', response);
      }
    });    
  }
  
  updateUser(user: any): void {
    const token = this.loginService.getToken();
    if (!token) {
      console.error('Token is missing.');
      return;
    }
  
    const updateData = {
      newUsername: user.userName,
      newPassword: user.password,
      newBirthday: user.birthday,
    };
  
    this.loginService.updateUser(updateData, { responseType: 'text' }).subscribe((response: any) => {
      if (response && response === 'User updated successfully!') {
        this.updateStatus = true;
      } else {
        this.updateStatus = false;
      }
    });
  }
  

  logout() {
    this.loginService.logout().subscribe(response => {
      this.loginService.clearToken();
    });
    this.loggedIn = false; 
  }

  showRegistration() {
    this.showRegistrationForm = true
  }

  registerUser(): void {
    this.showRegistrationForm = true;  
    this.loginService.registerUser(this.registerUserData).subscribe((response: any) => {
      console.log('123',response)
      if (response.message === 'User added successfully!') {
        console.log('1233')
        this.registrationStatus = true;
        this.registerUserData = {
          userName: '',
          password: '',
          birthday: '',
        };
          this.showRegistrationForm = false;
          this.registrationStatus = false;
      } else {
        this.showRegistrationForm = true;
      }
    });
  }
   back(){
    this.showRegistrationForm = false;
    this.loggedIn = false; 
    this.updateStatus = false;
   }
}
