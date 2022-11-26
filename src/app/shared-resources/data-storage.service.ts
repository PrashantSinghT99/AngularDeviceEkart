import { HttpClient, HttpClientModule, HttpParams } from "@angular/common/http";
import { Device } from "../devices/device.model";
import { Injectable } from '@angular/core';

import { DeviceService } from "../devices/device.service";
import { map, take, tap,exhaustMap } from "rxjs";
import { AuthService } from "../authentication/auth.service";

@Injectable({
    providedIn: 'root'
})
export class DatastorageService {
    constructor(private http: HttpClient,
        private deviceService: DeviceService,
        private authService:AuthService) { }

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
        
        
        
//it waits for first oberservable(user obs) to complete and gives us the user unsubscribe that and automaticaly replace it with new observable
 //exhaustmap because we cant return from subscribe