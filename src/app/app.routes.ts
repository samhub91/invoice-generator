import { Routes } from '@angular/router';
import { NewInvoiceComponent } from './pages/new-invoice/new-invoice.component';
import { InvoiceHistory } from './pages/invoice-history/invoice-history';
import { InvoiceDetail } from './pages/invoice-detail/invoice-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'new-invoice', pathMatch: 'full' },
  { path: 'new-invoice', component: NewInvoiceComponent },
  { path: 'invoice-history', component: InvoiceHistory },
  { path: 'invoice/:id', component: InvoiceDetail },
];
