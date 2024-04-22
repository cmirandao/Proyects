import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-new-book',
  standalone: true,
  imports: [SharedModule, CommonModule, MatFormField, MatLabel, MatError],
  templateUrl: './new-book.component.html',
  styleUrl: './new-book.component.scss'
})
export class NewBookComponent implements OnInit {
  public books: any = [];
  panelOpenState = false;
  bookForm: FormGroup;
  title = new FormControl('', [Validators.required]);
  authors = new FormControl('', [Validators.required]);
  language = new FormControl('', [Validators.required]);
  summary = new FormControl('', [Validators.required]);

  constructor(
    private _route: ActivatedRoute,
    private productsService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.bookForm = formBuilder.group({
      title: this.title,
      authors: this.authors,
      language: this.language,
      summary: this.summary,
      work_id: ''
    })
  }

  ngOnInit(): void {

  }

  saveProduct(): void {
    if (this.bookForm.valid) {
      const productData = this.bookForm.value;
      this.productsService.saveProduct(productData);
      this.clearForm();
      this.navigateToProducts();
    } else {
      alert('Por favor complete el formulario correctamente.');
    }
  }

  clearForm(): void {
    this.bookForm.reset();
  }

  cancel(): void {
    this.clearForm();
    this.navigateToProducts();
  }

  navigateToProducts() {
    this.productsService.navigateToProducts();
  }
}
