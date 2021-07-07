import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Framework } from './models/framework.model';
import { EmailValidatorAsync } from './validation/email.validatorAsync';
import { SuccessNotifyService } from '../services/success-notify.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-questionary',
  templateUrl: './questionary.component.html',
  styleUrls: ['./questionary.component.scss'],
  providers: [

  ]
})
export class QuestionaryComponent implements OnInit {

  form! : FormGroup;
  frameworks = [
    new Framework('Angular', ['1.1.1', '1.2.1', '1.3.3']),
    new Framework('React', ['2.1.2', '3.2.4', '4.3.1']),
    new Framework('Vue', ['3.3.1', '5.2.1', '5.1.3']),
  ];

  choosedFramework! : Framework;

  success!: boolean;
  subscription!: Subscription

  constructor (
    private formBuilder: FormBuilder, 
    private emailValidatorAsync : EmailValidatorAsync,
    private successNotifyServie : SuccessNotifyService
  ) 
  { 
  }

  ngOnInit(): void {
    this.subscription = this.successNotifyServie.currentSuccess.subscribe(status => this.success = status);

    this.form = this.formBuilder.group(
      {
        name: ['', [
          Validators.required
        ]] ,
        surname: ['', [
          Validators.required
        ]],
        dateOfBirth: ['', [
          Validators.required
        ]],
        framework: ['', [
          Validators.required
        ]],
        frameworkVersion: ['', [
          Validators.required
        ]],
        email: ['', [
          Validators.required,
          Validators.email,
        ], 
        this.emailValidatorAsync.validate.bind(this.emailValidatorAsync)],
        hobby: this.formBuilder.array([])
      }
    );

    this.form.controls['framework'].valueChanges.subscribe(
      frameworkName => this.chooseFramework(frameworkName)
    );

    this.newHobby();
  }

  get name() {
    return this.form.get('name') as FormGroup;
  }

  get surname() {
    return this.form.get('surname') as FormGroup;
  }

  get dateOfBirth() {
    return this.form.get('dateOfBirth') as FormGroup;
  }

  get framework() {
    return this.form.get('framework') as FormGroup;
  }

  get frameworkVersion() {
    return this.form.get('frameworkVersion') as FormGroup;
  }

  get email() {
    return this.form.get('email') as FormGroup;
  }

  get hobbies() {
    return this.form.get('hobby') as FormArray;
  }

  chooseFramework(name: string) {
    this.choosedFramework = this.frameworks.find(f => f.name == name) as Framework;
  }

  newHobby() {
    const hobby = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      duration: ['', [
        Validators.required
      ]]
    });

    this.hobbies.push(hobby);    
  }

  deleteHobby(i: number) {
    this.hobbies.removeAt(i);
  }

  reset() {
    for(let i = this.hobbies.length; i > 0; i--) {
      this.hobbies.removeAt(i);
    }

    this.form.reset();
  }

  submitHandler() {
    this.successNotifyServie.changeStatus(true);
  }

}
