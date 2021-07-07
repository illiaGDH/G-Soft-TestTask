import { Component, OnInit } from '@angular/core';
import { SuccessNotifyService } from '../../services/success-notify.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  subscription!: Subscription

  title!: string;
  subtitle!: string;

  constructor(private successNotifyServie : SuccessNotifyService) { }

  ngOnInit(): void {
    this.subscription = this.successNotifyServie.currentSuccess.subscribe(status => {

      if(status) {
        this.title = 'Thank you!';
        this.subtitle = 'Your answers are sended'
      } else {
        this.title = 'Please, take a survey';
        this.subtitle = 'It will take only few minutes'
      }
    });
  }

}
