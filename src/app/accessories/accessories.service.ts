import { Subject } from "rxjs";
import { Accessory } from "../shared-resources/accessory.model";

export class AccessoriesService {

  acessoriesChanged = new Subject<Accessory[]>();

  startedEditing = new Subject<number>();

  private accessories: Accessory[] = [
    new Accessory('earphones', 1),
    new Accessory('Cover', 1),
  ];
  getAccessory(index: number) {
    return this.accessories[index];

  }
  getAccessories() {
    return this.accessories.slice();
  }
  addAccessory(accessory: Accessory) {
    this.accessories.push(accessory);
    this.acessoriesChanged.next(this.accessories.slice());
 
  }


  addAccessories(accessories: Accessory[]) {
  
    this.accessories.push(...accessories);
    this.acessoriesChanged.next(this.accessories.slice());

  }

  updateAccessories(index: number, accessory: Accessory) {
    this.accessories[index] = accessory;

    this.acessoriesChanged.next(this.accessories.slice());
  }

  deleteAccessory(index:number)
  {
    this.accessories.splice(index,1);
    this.acessoriesChanged.next(this.accessories.slice());
  }

}

