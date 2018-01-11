import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {
  private products:Product[] = [
    new Product(1,'第一个商品',1,1.5,'这是第一个商品描述',['电子产品', '硬件设备']),
    new Product(2,'第二个商品',2,2.5,'这是第二个商品描述',['图书']),
    new Product(3,'第三个商品',3,3.5,'这是第三个商品描述',['水果']),
    new Product(4,'第四个商品',4,4.5,'这是第四个商品描述',['膨化食品']),
    new Product(5,'第五个商品',5,5,'这是第五个商品描述',['家用家具', '生活用品']),
  ];

  private comments:Comment[] = [
    new Comment(1,'张三',1,'2017-02-02 22:22:22',2,'产品很好'),
    new Comment(2,'李四',1,'2017-03-02 22:22:22',3,'产品质量好'),
    new Comment(3,'王五',1,'2017-04-02 22:22:22',4,'产品可以'),
    new Comment(4,'空心',1,'2017-05-02 22:22:22',4.5,'产品还好'),
    new Comment(5,'钟馗',2,'2017-06-02 22:22:22',5,'产品相当好'),
  ];

  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number): Product {
    return this.products.find(product => product.id === id);
  }

  getCommentByProductId(id:number):Comment[]{
    return this.comments.filter(comment => comment.productId === id);
  }

  getProductType():string[]{
    return ['电子产品','硬件设备','图书','水果','膨化食品','家用家具','生活用品'];
  }
}

export class Product{
  constructor(
    public id:number,
    public name:string,
    public price:number,
    public stars:number,
    public desc:string,
    public types:Array<string>
  ){}
}

export class Comment{
  constructor(
    public id:number,   // 用户id
    public userName:string, // 用户名字
    public productId:number,
    public timeStamp:string,
    public rating:number,
    public content:string
  ){}
}
