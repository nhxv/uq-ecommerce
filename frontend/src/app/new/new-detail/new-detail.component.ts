import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../../product/product.model";
import {ActivatedRoute, Params} from "@angular/router";
import {ProductService} from "../../product/product.service";
import {Subscription} from "rxjs";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-new-detail',
  templateUrl: './new-detail.component.html',
  styleUrls: ['./new-detail.component.scss']
})
export class NewDetailComponent implements OnInit, OnDestroy {
  product: Product;
  id: number;
  productSub: Subscription;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productService.getProductById(params.id);
      this.productSub = this.productService.productChanged.subscribe((productData: Product) => {
        this.product = productData;
      });
    });
  }

  getPath(index: number): string {
    let path = this.product.images[index].imagePath.slice(53);
    path = "../../../../" + path.split("\\").join("/");
    return path;
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

}
