import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  baseUrl = 'https://localhost:5001';

  constructor(private http: HttpClient) { }

  public getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/Books`);
  }

  public addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/Books`, newBook);
  }

  public deleteBook(bookId: number): Observable<Book> {
    return this.http.delete<Book>(`${this.baseUrl}/Books/${bookId}`);
  }

  public updateUserBook(newBookDetails: Book) {
    const url = `${this.baseUrl}/Books`;
    this.http.put<Book>(url, newBookDetails)
      .subscribe((res) => console.log(res));
  }

  public getBookByName(bookName: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/Books/${bookName}`)
  }
}
