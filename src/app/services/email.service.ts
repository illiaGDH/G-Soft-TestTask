import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EmailService{
  isEmailTaken(email: string): Observable<boolean> {
    const isTaken = email === 'test@test.test' ?  true : false;

    return of(isTaken).pipe(delay(2000));
  }
}


