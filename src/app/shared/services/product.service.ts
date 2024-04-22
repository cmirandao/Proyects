import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Books } from '../../models/products.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,
    private router: Router) { }
  private productsLocal: Books[] = [];
  private productsUpdated = new Subject<Books[]>();
  dataLoaded: boolean = false;
  private localStorageKey = 'products';

  getAllProducts(): Observable<any> {
    return this.http.get(`https://book-finder1.p.rapidapi.com/api/search`, {
      headers: {
        'X-RapidAPI-Key': '0d0bafb6dbmshce48d30c29f8a8dp1662e7jsnc12ba6787d32',
        'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
      }
    });
  }

  loadsProducts() {
    if (!this.productsLocal.length) {
      this.getAllProducts().subscribe(products => {
        this.productsLocal = products.results;
        this.saveLocalProducts();
        this.productsUpdated.next([...this.productsLocal]);
      });
    }
  }

  saveLocalProducts() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.productsLocal));
  }

  getProductsUpdatedListener() {
    return this.productsUpdated.asObservable();
  }

  getLocalProducts() {
    const productsJson = localStorage.getItem(this.localStorageKey);
    return productsJson ? JSON.parse(productsJson) : [];
  }

  getProductById(productId: any): Observable<any> {
    const product = this.productsLocal.find(item => item.work_id == productId);
    return of(product || null);
  }

  saveProduct(product: Books, id?: any): void {
    if (id) {
      const index = this.productsLocal.findIndex(p => p.work_id === id);
      if (index != -1) {
        this.productsLocal[index] = { ...product };
        this.saveLocalProducts();
        this.productsUpdated.next([...this.productsLocal]);
        this.navigateToProducts();
        alert(`${product.title} ha sido actualizado`);
      }
    } else {
      let newId = this.generateUniqueId();
      product.work_id = newId;
      this.productsLocal.push({ ...product });
      this.saveLocalProducts();
      this.productsUpdated.next([...this.productsLocal]);
      this.navigateToProducts();
      alert(`Libro guardado exitosamente`);
    }
  }

  private generateUniqueId(): any {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  deleteProduct(productToDelete: Books) {
    const isConfirmed = window.confirm(`¿Está seguro de querer eliminar el libro "${productToDelete.title}"?`);
    if (isConfirmed) {
      const index = this.productsLocal.findIndex(product => product.work_id === productToDelete.work_id);
      if (index !== -1) {
        this.productsLocal.splice(index, 1);
        this.saveLocalProducts();
        this.productsUpdated.next([...this.productsLocal]);
      } else {
        alert('Book not found!');
      }
    } else {
      alert('Book deletion canceled!');
    }
  }

  navigateToProducts() {
    this.router.navigate(['/home']);
  }

  navigateToProductDetail(book: any) {
    this.router.navigate([`/detail/${book}`]);
  }

  navigateToFormProduct() {
    this.router.navigate(['/newbook']);
  }

  resetDataFromEndpoint(): void {
    this.dataLoaded = false;
    this.loadsProducts();
  }


}
