import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import { Framework } from './models/framework.model';


@Component({
  selector: 'app-questionary',
  templateUrl: './questionary.component.html',
  styleUrls: ['./questionary.component.scss']
})
export class QuestionaryComponent implements OnInit {

  form! : FormGroup;
  frameworks = [
    new Framework('Angular', ['1.1.1', '1.2.1', '1.3.3']),
    new Framework('React', ['2.1.2', '3.2.4', '4.3.1']),
    new Framework('Vue', ['3.3.1', '5.2.1', '5.1.3']),
  ];

  choosedFramework! : Framework;

  constructor(private fb: FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name: '' ,
        surname: '',
        dateOfBirth: '',
        framework: '',
        frameworkVersion: '',
        email: '',
        hobby: this.fb.array([])
      }
    );

    this.form.valueChanges.subscribe((value) => {
      console.clear();
      console.log(value);
    });
   
    this.form.controls['framework'].valueChanges.subscribe(
      frameworkName => this.chooseFramework(frameworkName)
    );

    console.log(this.form.controls['hobby'].value[0]);
    this.newHobby();
  }

  chooseFramework(name: string) {
    this.choosedFramework = this.frameworks.find(f => f.name == name) as Framework;
  }

  get hobbies() {
    return this.form.get('hobby') as FormArray;
  }

  newHobby() {
    const hobby = this.fb.group({
      name: '',
      duration: ''
    });

    this.hobbies.push(hobby);
  }

  deleteHobby(i: number) {
    this.hobbies.removeAt(i);
  }
}
