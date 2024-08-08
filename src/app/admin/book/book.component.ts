import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../model/book.model';
import { BookService } from '../../service/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {

  errorMessage: string = "";

  @Input() book: Book = new Book();
  @Output() save = new EventEmitter<any>();
  constructor(private bookService: BookService) { }

  saveBook() {
    this.bookService.saveBook(this.book).subscribe(data => {
      this.save.emit(data);
      $('#bookModal').modal('hide');
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    })
  }

  showBookModal() {
    $('#bookModal').modal('show');
  }
}
