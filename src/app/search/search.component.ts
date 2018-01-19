import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  types: string[];

  priceValidator(price: FormControl): any {
    return Number(price.value) >= 0 ? null : {price: {describe: '价格不能为负数'}};
  }

  constructor(fb: FormBuilder, private productService: ProductService) {   // 依赖注入
    this.searchForm = fb.group({
      productTitle: ['', Validators.minLength(3)],
      productPrice: ['', this.priceValidator],
      productType: ['-1']
    });
  }

  ngOnInit() {
    this.types = this.productService.getProductType();
  }

  submit() {
    if (this.searchForm.valid) {
      // console.log(this.searchForm.value);
      this.productService.searchEvent.emit(this.searchForm.value);
    }
  }
}
