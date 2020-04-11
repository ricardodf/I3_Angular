import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../Product';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: string;
  product: Product;

  constructor(private route: ActivatedRoute, private productService: ProductsService) {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.product = this.productService.getSingleProduct(Number(this.productId));
  }

  ngOnInit(): void {
  }

}
