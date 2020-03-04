import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formGroup: FormGroup;

  constructor(public formBuilder: FormBuilder) { 
    this.formGroup = this.formBuilder.group({
      name: ['Thomas' , [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['thomas@gmail.com.br', [Validators.required, Validators.email]],
      type : ['1', [Validators.required]],
      register : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password : ['123', [Validators.required]],
      street : ['Rua Via', [Validators.required]],
      number : ['25', [Validators.required]],
      complement : ['Apto 3', []],
      neighborhood : ['Copacabana', []],
      cep : ['10828333', [Validators.required]],
      phone1 : ['977261827', [Validators.required]],
      phone2 : ['', []],
      phone3 : ['', []],
      stateId : ['3', [Validators.required]],
      cityId : ['3', [Validators.required]]      
    });
  }

  ngOnInit() {
  }

  signupUser() {
    console.log("enviou o form");
  }

}
