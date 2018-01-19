import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, ProductService,Comment} from '../shared/product.service';
import {WebsocketService} from '../shared/websocket.service';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private product: Product;
  private comments: Comment[];
  private productId :number;

  publishComment = {
    rating: 5,
    content: ''
  };

  isCommentHidden = true;   // 默认是隐藏的
  isWatched:Boolean = false;
  currentBid:number;
  subscription:Subscription;

  constructor(private route:ActivatedRoute,
               private productService:ProductService,
               private wsService:WebsocketService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // 访问params的属性，如params[‘id‘]总是返回一个字符串，可以通过+前缀将其转换为数字
      this.productId = +params.id;
      this.productService.getProduct(this.productId).subscribe(
        product => {this.product = product;}
      );
      this.productService.getCommentByProductId(this.productId).subscribe(
        comment => this.comments = comment
      );
    });
  }

  submit() {
    const publishInfo = new Comment(1, 'someone', this.product.id, new Date().toLocaleString(), this.publishComment.rating, this.publishComment.content);
    this.comments.unshift(publishInfo);

    this.publishComment.rating = 5;
    this.publishComment.content = '';
    this.isCommentHidden = true;

    const stars = this.comments.reduce((sum, item) =>  sum + item.rating, 0);
    this.product.stars = stars/this.comments.length;
  }

  productPriceWatch() {
    if (this.subscription) {  // 处于关注状态
      this.subscription.unsubscribe(); // 取消订阅的时候关闭websocket连接
      this.isWatched = false;
      this.subscription = null;
    } else {
      this.isWatched = true;
      this.subscription = this.wsService.createObservableWebsocket('ws://localhost:9000', {productId: this.productId})
        .subscribe(data => {
          console.log(data);
          const newBid = data.find(Bid => Bid.productId === this.productId);
          this.currentBid = newBid.bid;
        });
    }
  }

}
