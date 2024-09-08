import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.scss']
})
export class ProductListComponentComponent implements OnInit {

  private products: any[] = [];
  public visibleProducts: any[] = [];
  public categories = new Array<string>();
  public onFilterChange = new FormControl('');

  constructor(private productService: ProductService) {
    this.onFilterChange.valueChanges.subscribe((filter) => {
      this.refreshVisibleProducts(filter);
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  private refreshVisibleProducts(filter: any): void {
    this.visibleProducts = [];
    for(let product of this.products){
      if((product.category && product.category === filter) || filter == 'Show All'){
        this.visibleProducts.push(product);
      }
    }
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
        this.categories = this.productService.getCategories();
        this.refreshVisibleProducts('Show All');
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }
  
}
