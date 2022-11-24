import { Component, OnInit,Input } from '@angular/core';
import { Device } from '../device.model';
import { DeviceService } from '../device.service';
import {ActivatedRoute,Params,Router} from '@angular/router'

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {

  device:Device;
  id:number;

  constructor(private deviceService:DeviceService,
    private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    const id=this.route.params
    .subscribe((params:Params)=>
    {
      this.id=+params['id'];
this.device=this.deviceService.getDevice(this.id);
    });
  }

  onAddToAccessories()
  {
this.deviceService.addAccessoriesToList(this.device.accessories);
  }

  onEditDevice()
  {
    this.router.navigate(['edit'],{relativeTo:this.route});

    // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});

  }
  onDeleteDevice()
  {
    this.deviceService.deleteDevice(this.id);
    this.router.navigate(['/devices']);
  }

}
