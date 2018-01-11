import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, ProductService,Comment} from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private product: Product;
  private comments: Comment[];

  publishComment = {
    rating: 5,
    content: ''
  };

  isCommentHidden = true;   // 默认是隐藏的

  constructor(private route:ActivatedRoute,
               private productService:ProductService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // 访问params的属性，如params[‘id‘]总是返回一个字符串，可以通过+前缀将其转换为数字
      const productId:number = +params.id;
      this.product = this.productService.getProduct(productId);
      this.comments = this.productService.getCommentByProductId(productId);
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
}
