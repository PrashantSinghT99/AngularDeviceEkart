import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { DropdownDirective } from './shared-resources/dropdown.directive';
import { AccessoriesService } from './accessories/accessories.service';
import { AppRoutingModule } from './app-routing.module';
import { AccessoriesListComponent } from './accessories/accessories.component';
import { AccessoryEditComponent } from './accessories/accessory-edit/accessory-edit.component';
import { DeviceService } from './devices/device.service';
import { DeviceItemComponent } from './devices/device-list/device-item/device-item.component';
import { DeviceListComponent } from './devices/device-list/device-list.component';
import { DeviceStartComponent } from './devices/device-start/device-start.component';
import { DeviceDetailComponent } from './devices/device-detail/device-detail.component';
import { DeviceEditComponent } from './devices/device-edit/device-edit.component';
import { DatastorageService } from './shared-resources/data-storage.service';
import { DevicesComponent } from './devices/devices.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DevicesComponent,
    AccessoriesListComponent,
    AccessoryEditComponent,
    DropdownDirective,
    DeviceItemComponent,
    DeviceListComponent,
    DeviceStartComponent,
    DeviceDetailComponent,
    DeviceEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AccessoriesService, DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
