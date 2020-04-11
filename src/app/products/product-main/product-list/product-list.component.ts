import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../Product';
import { Router } from '@angular/router';
import { ProductsService } from '../../products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  router: string;
  products: Product[];
  productsFilter: Product[];
  monitorFilter: Product[];
  idMonitoreados: number[];

  productsSubscription = new Subscription();

  searchMessage = '';

  constructor(private _router: Router, private productService: ProductsService) {
    this.router = _router.url;
    this.products = this.productService.getProducts();
    this.idMonitoreados = this.productService.getMonitoreados();
    this.productsFilter = [];
    this.monitorFilter = [];

    this.productService.productsSubject.subscribe( (data) => {
      this.products = data;
    });
    for (const product of this.products) {
      this.productsFilter.push(product);
      if (this.idMonitoreados.includes(product.uid)) {
        this.monitorFilter.push(product);
      }
    }
  }

  ngOnInit(): void {
  }

  getSelected($event) {
    if ($event.isChecked && !this.idMonitoreados.includes($event.productID)) {
      this.idMonitoreados.push($event.productID);
    } else if (!$event.isChecked && this.idMonitoreados.includes($event.productID)){
      const index = this.idMonitoreados.findIndex( (id) => id === $event.productID);
      this.idMonitoreados.splice(index, 1);
    }
  }

  search() {
    if (this.router === '/products'){
      this.productsFilter = this.products.filter( (product) => {
        return product.nombre.toUpperCase().includes(this.searchMessage.toUpperCase()) ||
               product.descripcion.toUpperCase().includes(this.searchMessage.toUpperCase()) ||
               product.marca.toUpperCase().includes(this.searchMessage.toUpperCase());
      });
    } else {
      this.monitorFilter = this.products.filter( (product) => {
        return (product.nombre.toUpperCase().includes(this.searchMessage.toUpperCase()) ||
               product.descripcion.toUpperCase().includes(this.searchMessage.toUpperCase()) ||
               product.marca.toUpperCase().includes(this.searchMessage.toUpperCase())) &&
               this.idMonitoreados.includes(product.uid);
      });
    }
  }

  confirmSelected() {
    this.productService.updateMonitoreados(this.idMonitoreados);
  }

  noMonitoreo() {
    return this.idMonitoreados.length < 1;
  }
}
