import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})

export class DeleteComponent implements OnInit {
  @Input() bookId!: number;
  
  constructor(private bookService: BooksService
    ,private router: Router
    ,private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  onDelete() {
    this.bookService.deleteBook(this.bookId).subscribe((data) =>{
      if (data) {
        this.modalService.dismissAll();
        this.openAlertResponseModalComponent();
        this.router.navigate(['list']);
      }
    });
  }
  
  openAlertResponseModalComponent() {
    const successfulDelete = this.modalService.open(AlertComponent);
    successfulDelete.componentInstance.message = 'Book successfuly deleted';
    successfulDelete.componentInstance.header = 'Delete Book';
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}