import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SharedServiceService } from 'src/app/shared/shared-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public sharedService : SharedServiceService,
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
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  get loginValue() {
    return this.loginForm.controls;
  }


  submit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.sharedService.login(this.loginForm.value).subscribe((res: any) => {
      localStorage.setItem('loggedInUserDetails', JSON.stringify(res.body.data));
      localStorage.setItem('loggedInUserToken', JSON.stringify(res.body.data.token));
            this.router.navigate(['/movies']);
        
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logged in succsesfully' });
    },(error:any) => {     
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error ? error.message : 'Something went wrong' });
    }
    )
  }

}
