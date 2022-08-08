import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';
import { DeleteComponent } from '../delete/delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  public books: Book[] = [];
  public userId!: number;
  public subscription!: Subscription;
  public isLoading = false;
  bookName!: string;
  bookId!: any;

  constructor(private bookService: BooksService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router
    ) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   this.userId = params['userId'];
    // });

    this.isLoading = true;
    this.bookService.getAllBooks().subscribe(
      (data) => {
        this.books = data;
        this.isLoading = false;
      }
    );
  }

  onSearch() {
    this.bookService.getBookByName(this.bookName).subscribe((data) => {
      if (data) {
        this.router.navigate(['books']);
      }
    });
  }
  viewUserBooks() {
    this.books = [];
    this.isLoading = true;
    this.subscription = this.bookService.getAllBooks().subscribe(
      (data: Book[]) => {
        this.books = data;
        console.log();
        
        this.isLoading = false;
      }
    );
    this.router.navigate(['books']);
  }

  addBook() {
    this.router.navigate(['/add']);
  }

  // onDelete() {
  //   this.bookService.deleteBook().subscribe((data) => {
  //     if (data) {
  //       this.router.navigate(['/list']);
  //     }
  //   });
  // }

  
  // onDeleteModal() {
  //   const deleteComponent = this.modalService.open(DeleteComponent);
  //   deleteComponent.componentInstance.bookId = bookId;
  // }

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }
}
