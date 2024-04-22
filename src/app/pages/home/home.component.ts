import { Component, OnInit  } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { fadeInOut, transformacionAnimacion } from '../../animations/animations';
import { CommonModule } from '@angular/common';
import { Books } from '../../models/products.models';
import { Subscription } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    // MatTableModule, MatCardModule, MatExpansionModule,MatToolbarModule, MatButtonModule, MatIconModule,MatTooltipModule,
    CommonModule, SharedModule],
  animations: [fadeInOut, transformacionAnimacion],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public all_products: any = [];
  public headers = ['id', 'Nombre', 'Dificultad', 'Imagen'];
  public books : Books[]=[];
  urlImage :any;
  productsSubscription!: Subscription;
  selectedProduct: Books | null = null;
  dataLoaded: boolean = false;
  panelOpenState = false;

  constructor(private _productsService: ProductService) {}

  ngOnInit(){
    if (!this.dataLoaded) {
      this.getAllProducts();
    } else {
      this.books = this._productsService.getLocalProducts(); 
    }
  }

  getAllProducts() {
    this._productsService.loadsProducts();
    this.books = this._productsService.getLocalProducts();
    this.productsSubscription = this._productsService.getProductsUpdatedListener().subscribe((updatedProducts: Books[]) => {
      this.books = updatedProducts;
      this.dataLoaded = true;
    });
  }

  deleteProduct(productToDelete: Books) {
    this._productsService.deleteProduct(productToDelete);
    this.books = this._productsService.getLocalProducts();
  }

  editProduct(book: any) {
    this._productsService.navigateToProductDetail(book);
  } 

  toggleHide(product: Books) {    
    this.selectedProduct = this.selectedProduct === product ? null : product;
  }

  navigateToFormProduct() {
    this._productsService.navigateToFormProduct();
  }

  ngOnDestroy() {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
