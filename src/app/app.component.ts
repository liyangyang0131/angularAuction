import { Component } from '@angular/core';
import {environment} from '../environments/environment';

@Component({     // 装饰器元数据
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'app';
  constructor(){
    console.log(environment.evn);
  }
}
