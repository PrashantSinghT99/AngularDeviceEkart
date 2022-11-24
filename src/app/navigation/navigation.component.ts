import { Component} from "@angular/core";
import { DatastorageService } from "../shared-resources/data-storage.service";
@Component(
    {
        selector: 'navigation',
        templateUrl: './navigation.component.html',
    }
)
export class NavigationComponent {
    constructor(private dataStorageService: DatastorageService) { }
    
    onSaveData() {
        this.dataStorageService.storeDevices();

    }
    onFetchData() {
        this.dataStorageService.fetchDevices().subscribe();
    }

}