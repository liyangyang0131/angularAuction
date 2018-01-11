import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from '../shared/product.service';
import {FormControl} from '@angular/forms';
import  'rxjs/Rx';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private products:Product[];
  productNameSearch:FormControl = new FormControl();
  private kw:string;
  constructor(private productService:ProductService) {
    this.productNameSearch.valueChanges
      .debounceTime(500)
      .subscribe(val => this.kw = val);
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }
}
