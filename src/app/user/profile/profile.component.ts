import { Component } from '@angular/core';
import { PurchaseService } from '../../service/purchase.service';
import { PurchaseItem } from '../../model/purchaseItem.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  purchaseItemList: Array<PurchaseItem> = [];

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.purchaseService.getAllPurchaseItems().subscribe(data => {
      this.purchaseItemList = data;
    });
  }
}
