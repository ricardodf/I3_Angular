import { Component, OnInit, Input, Output } from '@angular/core';
import { Product } from 'src/app/products/Product';
import { ProductsService } from 'src/app/products/products.service';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() productInfo: Product;
  @Input() productID: number;

  @Output() sendSelected = new EventEmitter<object>();

  router: string;
  idMonitoreados: number[];
  isDeleted = false;

  constructor(private _router: Router, private productService: ProductsService) {
    this.router = _router.url;
    this.idMonitoreados = this.productService.getMonitoreados();
  }

  ngOnInit(): void {
  }

  sendEvent(event) {
    this.sendSelected.emit({productID: this.productInfo.uid, isChecked: event.target.checked});
  }
  deleteThis() {
    if (this.router.includes('monitoreo')) {
      this.isDeleted = true;
      this.productService.deleteID(this.productInfo.uid);
    } else {
      this.isDeleted = true;
      this.productService.deleteProduct(this.productInfo.uid);
    }
  }
}
