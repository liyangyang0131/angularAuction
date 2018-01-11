import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit,OnChanges {
  @Input()
  rating: number;

  @Input()
  readonly:Boolean = true;  // 默认是不可点击的

  @Output()
  ratingChange:EventEmitter<number> = new EventEmitter();

  private stars: Boolean[];
  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {   // 输入属性发生变化时会被调用
    this.stars = [];
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i > this.rating);
    }
  }
  ngOnInit() {

  }
  clickStar(index:number){
    if(!this.readonly){
      this.rating = index + 1;   // 下标是从0开始的，输入属性发生变化，调用ngOnChanges
      this.ratingChange.emit(this.rating);
    }
  }
}
