import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { CarouselComponent } from './carousel/carousel.component';
import { StarsComponent } from './stars/stars.component';
import { ProductComponent } from './product/product.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Code404Component } from './code404/code404.component';
import {ProductService} from './shared/product.service';
import {WebsocketService} from './shared/websocket.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FilterPipe } from './pipe/filter.pipe';
import {LocationStrategy,HashLocationStrategy} from '@angular/common';


@NgModule({
  // 组件、指令、管道
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    CarouselComponent,
    StarsComponent,
    ProductComponent,
    HomeComponent,
    ProductDetailComponent,
    Code404Component,
    FilterPipe,
  ],
  imports: [          // 依赖,
    BrowserModule,    // 浏览器模块
    AppRoutingModule,  // 路由模块
    ReactiveFormsModule,  // 响应式编程模块
    FormsModule,          // 表单模块
    HttpModule,           // http
  ],
  providers: [ProductService,WebsocketService,{
    provide:LocationStrategy,  // 部署到服务器，刷新页面出现404
    useClass:HashLocationStrategy
  }],  // 依赖注入服务
  bootstrap: [AppComponent]
})
export class AppModule { }
