import { Injectable } from '@angular/core';
import { Product, Especificacion } from './Product';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[];
  marcas = ['Apple', 'Samsung', 'Huawei', 'Nokia', 'LG']
  idMonitoreados: number[];

  productsSubject = new BehaviorSubject<Product[]>([]);

  constructor() {
    this.products = [
      new Product(1, 'iPod', 'Apple', 'Esto es el producto 1', 10, 1, [new Especificacion('Almacenamiento', '36', 'GB')]),
      new Product(2, 'Galaxy 8', 'Samsung', 'Esto es el producto 2', 20, 2, [new Especificacion('Bateria', '4000', 'amp')]),
      new Product(3, 'LG Neon', 'LG', 'Esto es el producto 3', 30, 3, [new Especificacion('Memoria RAM', '4', 'GB')])
    ];
    this.idMonitoreados = [];
    this.productsSubject.next(this.getProducts());
  }

  // PRODUCTS
  getProducts(): Product[] {
    return this.products;
  }
  getSingleProduct(id): Product {
    return this.products.find( (product) => product.uid === id);
  }
  createProduct(product: Product) {
    this.products.push(product);
  }
  updateProduct(IDtoUpdate, product) {
    const index = this.products.findIndex( (obj) => obj.uid === IDtoUpdate);
    if (index !== -1) {
      this.idMonitoreados[index] = product;
    }
  }
  deleteProduct(IDtoDelete) {
    let index = this.idMonitoreados.findIndex( (id) => id === IDtoDelete);
    if (index !== -1) {
      this.idMonitoreados.splice(index, 1);
    }
    index = this.products.findIndex( (product) => product.uid === IDtoDelete);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  // MONITOREO
  getMonitoreados() {
    return this.idMonitoreados.slice();
  }
  updateMonitoreados(newArray) {
    this.idMonitoreados = newArray;
  }
  addNewID(newID) {
    const index = this.idMonitoreados.findIndex( (id) => id === newID);
    if (index === -1) {
      this.idMonitoreados.push(index);
    }
  }
  deleteID(IDtoDelete) {
    const index = this.idMonitoreados.findIndex( (id) => id === IDtoDelete);
    if (index !== -1) {
      this.idMonitoreados.splice(index, 1);
    }
  }

  // MARCAS
  getMarcas() {
    return this.marcas.slice();
  }
}
