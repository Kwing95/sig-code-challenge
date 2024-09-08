import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/products';
  private categories = ['Show All'];

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap(response => this.parseProductCategories(response)),
      catchError(this.handleError)
    );
  }

  public getCategories(): Array<string> {
    return this.categories;
  }

  private parseProductCategories(data: Array<any>): void {
    data.forEach(item => {
      if (item.category && !this.categories.includes(item.category)) {
        this.categories.push(item.category);
      }
    });
  }

  private handleError(error: any): Observable<never> {
    console.error('ERROR:', error);
    throw new Error('Error in getProducts');
  }

}
