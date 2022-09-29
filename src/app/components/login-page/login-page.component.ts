import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  

  constructor(
    private fb: FormBuilder,
    public messageService : MessageService,
    public router : Router
  ) { 

  }

  loginForm!: FormGroup;
  submitted = false

  ngOnInit(): void {
    this.initLoginForm()
  }



  initLoginForm() {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  get loginValue() {
    return this.loginForm.controls;
  }


  submit() {
    this.submitted = true
    if(this.submitted && this.loginForm.valid){
    this.router.navigate(['dashboard']);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logged in succsesfully' });
    }
    else{
      return
    }
  }
}
