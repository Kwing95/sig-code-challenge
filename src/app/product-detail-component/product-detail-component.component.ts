import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail-component',
  templateUrl: './product-detail-component.component.html',
  styleUrls: ['./product-detail-component.component.scss']
})
export class ProductDetailComponentComponent implements OnInit {

  public product = {
    name: '',
    price: 0,
    description: '',
    category: '',
    image_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAAQCAYAAAAAgAABAAAAAElFTkSuQmCC'
  };

  constructor(
    public productService: ProductService,
    public dialogRef: MatDialogRef<ProductDetailComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public productId: number) {}

  ngOnInit(): void {
    this.loadProductDetails();
  }

  private loadProductDetails(){
    this.productService.getProductDetails(this.productId).subscribe(
      data => {
        console.log('assigning to this.product: ');
        console.log(data);
        this.product = data;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  public onClose(): void{
    this.dialogRef.close();
  }

}
