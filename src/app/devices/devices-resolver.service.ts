import { Injectable } from "@angular/core";
import { Device } from "./device.model";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DatastorageService } from "../shared-resources/data-storage.service";
import { DeviceService } from "./device.service";



@Injectable({ providedIn: 'root' })
export class DeviceResolverService implements Resolve<Device[]>{

    constructor(private dataStorageService: DatastorageService,
        private deviceService: DeviceService) { }



    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


        const devices = this.deviceService.getDevices();
        if (devices.length === 0) {
            return this.dataStorageService.fetchDevices();
        }
        else {
            return devices;
        }
    }



}
