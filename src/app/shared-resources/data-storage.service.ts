import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Device } from "../devices/device.model";
import { Injectable } from '@angular/core';

import { DeviceService } from "../devices/device.service";
import { map, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DatastorageService {
    constructor(private http: HttpClient,
        private deviceService: DeviceService) { }

    storeDevices() {
        
        const devices = this.deviceService.getDevices();

        this.http.put(
            'https://myangularapp-60be6-default-rtdb.firebaseio.com/devices.json',
            devices
        ).subscribe(response => {
            console.log(response);
        });

    }

    fetchDevices() {
        return this.http.get<Device[]>(
            'https://myangularapp-60be6-default-rtdb.firebaseio.com/devices.json').

            pipe(
                map(devices => {
                    return devices.map(device => {
                        return { ...device, accessories: device.accessories ? device.accessories : [] };
                    });
                }), tap(devices => {
                    this.deviceService.setDevices(devices);
                }))
    }
}
