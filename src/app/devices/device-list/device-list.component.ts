import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Device } from '../device.model';
import { DeviceService } from '../device.service';
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  devices: Device[];

  constructor(private deviceService: DeviceService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.devices = this.deviceService.getDevices();

    this.subscription = this.deviceService.deviceChanged.subscribe((devices: Device[]) => {
      this.devices = devices;
    })
  }
  onNewDevice() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

  }
}