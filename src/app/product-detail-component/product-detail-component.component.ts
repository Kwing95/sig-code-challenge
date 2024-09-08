import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-detail-component',
  templateUrl: './product-detail-component.component.html',
  styleUrls: ['./product-detail-component.component.scss']
})
export class ProductDetailComponentComponent implements OnInit {

  public product = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    category: '',
    image_url: ''
  };
  public editMode:boolean = false;
  public newName = new FormControl<string>('');
  public newPrice = new FormControl<number>(0);

  constructor(
    public productService: ProductService,
    public dialogRef: MatDialogRef<ProductDetailComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public productId: number) {}

  ngOnInit(): void {
    this.loadProductDetails();
  }

  private loadProductDetails(): void {
    this.productService.getProductDetails(this.productId).subscribe(
      data => {
        this.product = data;
        this.newName.setValue(this.product.name);
        this.newPrice.setValue(this.product.price);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  public toggleEditMode(): void {
    this.editMode = !this.editMode;
    this.newName.setValue(this.product.name);
    this.newPrice.setValue(this.product.price);
  }

  public saveChanges(): void {
    this.editMode = false;

    const payload = {
      name: this.newName.getRawValue(),
      price: this.newPrice.getRawValue()
    };
    this.productService.updateProductDetails(this.product.id, payload).subscribe(
      data => {
        this.product.name = data.name;
        this.product.price = data.price;
        this.productService.sendChangeEvent(this.productId);
      },
      error => {
        console.error('Error: ', error);
      }
    );
    
  }

  public onClose(): void {
    this.dialogRef.close();
  }

}
