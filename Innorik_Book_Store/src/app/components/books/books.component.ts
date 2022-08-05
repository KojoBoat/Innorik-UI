import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/books';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book = {
    id: 0,
    bookName: 'rich dad',
    category: 'financial',
    price: 20,
    description: 'extensive financies'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
