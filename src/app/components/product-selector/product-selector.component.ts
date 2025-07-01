import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-selector.component.html'
})
export class ProductSelectorComponent {
  @Output() productAdded = new EventEmitter<Product>();
  product: Product = { name: '', price: 0, quantity: 1 };

  addProduct() {
    if (this.product.name.trim() && this.product.price > 0 && this.product.quantity > 0) {
      this.productAdded.emit({ ...this.product });
      this.product = { name: '', price: 0, quantity: 1 };
    }
  }
}