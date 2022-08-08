import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BooksService } from 'src/app/services/books.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Book } from 'src/app/models/book';
import { AlertComponent } from '../alert/alert.component';
import { DeleteComponent } from '../delete/delete.component';
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  bookForm!: FormGroup;
  subscription!: Subscription;
  bookId!: number;
  bookName!: string;

  constructor(
    private route: Router,
    private bookService: BooksService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.bookId = params['id'];
      this.bookName = params['bookName'];
      this.initForm();
    });
  }

  private initForm() {
    this.bookForm = new FormGroup({
      id: new FormControl({value:'', disabled:true}),
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });

    this.subscription = this.bookService.getBookByName(this.bookName).subscribe((book) => {
      this.bookForm.patchValue({
        id: book.id,
        name: book.bookName,
        category: book.category,
        description: book.description,
        price: book.price
      });
    });
  }

  onSubmit() {
    const bookUpdate: Book = {
      id: this.bookForm.value.id,
      bookName: this.bookForm.value.name,
      category: this.bookForm.value.category,
      description: this.bookForm.value.description,
      price: this.bookForm.value.price
    }

    this.bookService.updateUserBook(bookUpdate);
    const editMessage = this.modalService.open(AlertComponent);
    editMessage.componentInstance.message = "Book updated successsfuly, click on close to dismiss";
    editMessage.componentInstance.header = "Edit Message";
    this.onCancel();
  }

  onCancel(): void {
    this.route.navigate(['../..'], {relativeTo: this.activatedRoute});
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
