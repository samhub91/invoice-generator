import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-invoice-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './invoice-history.html',
  styleUrl: './invoice-history.css'
})
export class InvoiceHistory {
  invoices: any[] = [];

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.invoices = JSON.parse(localStorage.getItem('invoices') ?? '[]');
  }

  viewInvoice(id: number) {
    this.router.navigate(['/invoice', id]);
  }
}
