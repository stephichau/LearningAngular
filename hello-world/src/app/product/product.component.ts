import { Component, OnInit } from '@angular/core';

@Component({ // Command to create the component with the respective selector, html and css
  selector: 'app-product', // <app-product> </app-product>
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
//export class ProductComponent implements OnInit {
export class ProductComponent {
  //constructor() {
  //}
  //ngOnInit() {
  //}
  name = "USB - 10";
  productCount = 0;

  addItem(){
    this.productCount++;
  }
  removeItem(){
    if(this.productCount > 0){
      this.productCount--;
    }
  }
}
