import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent {
  @Output() customerSelected = new EventEmitter<Customer>();
  customer: Customer = { id: Date.now(), name: '', email: '' };

  selectCustomer() {
    if (this.customer.name.trim()) {
      this.customerSelected.emit({ ...this.customer });
    }
  }
}
