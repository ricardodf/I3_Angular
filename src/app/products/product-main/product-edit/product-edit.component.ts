import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product, Especificacion } from '../../Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  productId: string;
  product: Product;
  marcas: string[];
  especificacion: Especificacion;
  router: string;

  enableGuardar = false;

  constructor(private route: ActivatedRoute, private _router: Router, private productService: ProductsService) {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.router = _router.url;
    this.especificacion = {atributo: '', valor: '', unidad: ''};
    this.marcas = this.productService.getMarcas();

    if (this.router.includes('edit')) {
      this.product = this.productService.getSingleProduct(Number(this.productId));
    } else if (this.router.includes('new')) {
      this.product = new Product(-1, '', '', '', 0, 0, []);
    }
  }

  ngOnInit(): void { }

  submit(form: NgForm) {
    if (form.valid && this.router.includes('edit')) {
      this.productService.updateProduct(this.productId, this.product);
    } else if (form.valid && this.router.includes('new')) {
      this.productService.createProduct(this.product);
    }
  }

  addEspecificacion() {
    this.product.especificacion.push(this.especificacion);
  }
  deleteEspecificacion(index) {
    this.product.especificacion.splice(index, 1);
  }

}
