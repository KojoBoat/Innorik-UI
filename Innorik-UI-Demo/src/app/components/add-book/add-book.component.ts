import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/models/book';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;

  constructor(private router: Router,
    private bookService: BooksService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }

  onCancel() {
    this.router.navigate(['../']);
  }

  onSubmit() {
    const newBook: Book = {
      id: this.bookForm.value.id,
      bookName: this.bookForm.value.name,
      category: this.bookForm.value.category,
      description: this.bookForm.value.description,
      price: this.bookForm.value.price
    }

    this.bookService.addBook(newBook).subscribe((data) => {
      console.log("Get Data", data);
      
      if (data) console.log("data",data);
      
      const successfulCreate = this.modalService.open(AlertComponent);
      successfulCreate.componentInstance.message = "Book added successfuly";
      this.router.navigate(['/list']);
    });
  }
}
