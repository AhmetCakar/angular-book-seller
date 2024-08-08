import { Component } from '@angular/core';
import { Purchase } from '../../model/purchase.model';
import { Book } from '../../model/book.model';
import { AuthenticationService } from '../../service/authentication.service';
import { BookService } from '../../service/book.service';
import { PurchaseService } from '../../service/purchase.service';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  bookList: Array<Book> = [];
  faBook = faBook;
  errorMessage: string = "";
  infoMessage: string = "";

  constructor(private authenticationService: AuthenticationService,
              private bookService: BookService,
              private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(data => {
      this.bookList = data;
    })
  }

  purchase(item: Book) {
    if (!this.authenticationService.currentUserValue?.id) {
      this.errorMessage = 'You should log in to buy a book';
      return;
    }

    const purchase = new Purchase(this.authenticationService.currentUserValue.id, item.id, item.price);

    this.purchaseService.savePurchase(purchase).subscribe(data => {
      this.infoMessage = 'Mission is completed';
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    });
  }
}
