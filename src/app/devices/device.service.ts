import { EventEmitter,Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Accessory } from '../shared-resources/accessory.model';
import { Device } from './device.model'
import { AccessoriesService } from '../accessories/accessories.service';

@Injectable()
export class DeviceService {
deviceChanged=new Subject<Device[]>();
private devices: Device[]=[];


  constructor(private accService:AccessoriesService){}

  setDevices(devices:Device[])
    {
      this.devices=devices;
      this.deviceChanged.next(this.devices.slice());
    }

  getDevices() {
    return this.devices.slice();
  }

  getDevice(index:number)
  {
    return this.devices.slice()[index];
  }

  addAccessoriesToList(accessories:Accessory[])
  {
this.accService.addAccessories(accessories);
  }

addDevice(device:Device)
{
this.devices.push(device);
this.deviceChanged.next(this.devices.slice());
}
updateDevice(index:number,newDevice:Device)

{
this.devices[index]=newDevice;
this.deviceChanged.next(this.devices.slice());
}


deleteDevice(index:number)
{
  this.devices.splice(index,1);
  this.deviceChanged.next(this.devices.slice());
}
}