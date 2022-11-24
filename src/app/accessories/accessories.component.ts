import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Accessory } from '../shared-resources/accessory.model';
import { AccessoriesService } from './accessories.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesListComponent implements OnInit, OnDestroy {


  accessories: Accessory[];
  private idChangeSub: Subscription;


  constructor(private accService: AccessoriesService) { }

  ngOnInit() {
    this.accessories = this.accService.getAccessories();

    this.idChangeSub = this.accService.acessoriesChanged.subscribe(
      (accessories: Accessory[]) => {
        this.accessories = accessories;
      }
    )

  }

  onEdititem(index: number) {
    this.accService.startedEditing.next(index);
  }

  ngOnDestroy(): void {

    this.idChangeSub.unsubscribe();
  }
}
