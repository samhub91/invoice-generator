import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class InvoiceTableComponent {
  @Input() items: Product[] = [];
  @Output() itemRemoved = new EventEmitter<number>();

  removeItem(index: number) {
    this.itemRemoved.emit(index);
  }
}