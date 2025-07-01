/**
 * 🧾 Load and display a customer selection form.
 * If a customer is selected, store their data in a customer variable.
 * This can be from a dropdown or an input form.
 */

/**
 * 📦 Allow user to select/add products or services.
 * Each product should have at least: name, price, quantity.
 * Add selected items to an invoiceItems array.
 */

/**
 * 🧮 Calculate invoice totals automatically.
 * Create subtotal, tax, and total getters.
 * Subtotal = sum of all (price * quantity)
 * Tax = subtotal * 0.16 (or a configurable rate)
 * Total = subtotal + tax
 */

/**
 * 📊 Display invoice in a table using InvoiceTableComponent.
 * It should show each product, quantity, price, and total.
 * Add a remove button on each row to remove an item.
 */

/**
 * 💾 Save or send invoice when the user clicks "Save Invoice".
 * For now, console.log() the invoice object with all data.
 * Optionally send to an API or save in localStorage.
 */

/**
 * @property {any} customer - the selected customer object
 * @property {any[]} invoiceItems - list of added products/services
 * @returns {number} subtotal, tax, and total from invoiceItems
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { CustomerFormComponent } from '../../components/customer-form/customer-form.component';
import { ProductSelectorComponent } from '../../components/product-selector/product-selector.component';
import { InvoiceTableComponent } from '../../components/invoice-table/invoice-table.component';
import { Customer } from '../../models/customer.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-new-invoice',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CustomerFormComponent,
    ProductSelectorComponent,
    InvoiceTableComponent
  ],
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.css']
})
export class NewInvoiceComponent {
  invoiceItems: Product[] = [];
  selectedCustomer: Customer | null = null;
  taxRate = 0.16;

  constructor(private readonly router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects.startsWith('/new-invoice')) {
        this.resetInvoice();
      }
    });
  }

  get subtotal(): number {
    return this.invoiceItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  get tax(): number {
    return this.subtotal * this.taxRate;
  }
  get total(): number {
    return this.subtotal + this.tax;
  }

  onCustomerSelected(customer: Customer) {
    this.selectedCustomer = customer;
  }
  onProductAdded(product: Product) {
    this.invoiceItems.push(product);
  }
  onItemRemoved(index: number) {
    if (index > -1 && index < this.invoiceItems.length) {
      this.invoiceItems.splice(index, 1);
    }
  }
  saveInvoice() {
    if (!this.selectedCustomer || this.invoiceItems.length === 0) {
      alert('Please select a customer and add at least one product.');
      return;
    }
    const invoice = {
      id: Date.now(),
      customer: this.selectedCustomer,
      items: this.invoiceItems,
      subtotal: this.subtotal,
      tax: this.tax,
      total: this.total,
      date: new Date().toISOString()
    };
    // Save to localStorage as an array
    const invoices = JSON.parse(localStorage.getItem('invoices') ?? '[]');
    invoices.push(invoice);
    localStorage.setItem('invoices', JSON.stringify(invoices));
    alert('Invoice saved!');
    this.selectedCustomer = null;
    this.invoiceItems = [];
  }
  resetInvoice() {
    this.selectedCustomer = null;
    this.invoiceItems = [];
  }
}
