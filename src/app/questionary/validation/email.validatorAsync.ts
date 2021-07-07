import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EmailService } from 'src/app/services/email.service';

@Injectable({ providedIn: 'root' })
export class EmailValidatorAsync implements AsyncValidator{
  constructor(private emailService: EmailService) {}

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.emailService.isEmailTaken(control.value).pipe(
      map(isEmailTaken => (isEmailTaken ? {emailTaken: true} : null)),
      catchError(()=> of(null))
    );
  }
}