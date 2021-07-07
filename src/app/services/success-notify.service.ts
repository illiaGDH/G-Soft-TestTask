import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SuccessNotifyService {

  private success = new BehaviorSubject(false);
  currentSuccess = this.success.asObservable();

  constructor() { }

  changeStatus(status : boolean) {
    this.success.next(status)
  }

}