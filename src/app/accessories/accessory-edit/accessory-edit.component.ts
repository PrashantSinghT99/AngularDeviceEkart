import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Accessory } from 'src/app/shared-resources/accessory.model';
import { AccessoriesService } from '../accessories.service';

@Component({
  selector: 'app-accessory-edit',
  templateUrl: './accessory-edit.component.html',
  styleUrls: ['./accessory-edit.component.css']
})
export class AccessoryEditComponent implements OnInit, OnDestroy {
  
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;

  editItemIndex: number;

  editedItem: Accessory;

  constructor(private accService: AccessoriesService) { }

  ngOnInit() {

    this.subscription = this.accService.startedEditing.subscribe((index: number) => 
    {
      this.editMode = true;

      this.editItemIndex = index;

      this.editedItem = this.accService.getAccessory(index);

      this.slForm.setValue({
        name: this.editedItem.name,
        quantity: this.editedItem.quantity
      })
    });
  }

  onSubmit(form: NgForm) {

  
    const value = form.value;

    const newAccessory = new Accessory(value.name, value.quantity);
    if (this.editMode) {
      this.accService.updateAccessories(this.editItemIndex, newAccessory);
    }
    else {
      this.accService.addAccessory(newAccessory);
    }
    this.editMode=false;
    form.reset();

  }
 

  onClear()
  {
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete()
{
  this.accService.deleteAccessory(this.editItemIndex);
  this.onClear();
}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
