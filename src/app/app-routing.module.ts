import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { DeviceEditComponent } from './devices/device-edit/device-edit.component';
import { DeviceDetailComponent } from './devices/device-detail/device-detail.component';
import { AccessoriesListComponent } from './accessories/accessories.component';
import { DeviceStartComponent } from './devices/device-start/device-start.component';
import { DeviceResolverService } from './devices/devices-resolver.service';
import { AuthComponent } from './authentication/auth.component';
import { AuthGuard } from './authentication/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/devices', pathMatch: 'full' },
  {
    path: 'devices',
    component: DevicesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DeviceStartComponent },
      { path: 'new', component: DeviceEditComponent },
      {
        path: ':id',
        component: DeviceDetailComponent,
        resolve: [DeviceResolverService],
      },
      {
        path: ':id/edit',
        component: DeviceEditComponent,
        resolve: [DeviceResolverService],
      },
    ],
  },
  { path: 'accessories', component: AccessoriesListComponent },
  { path: 'authentication', component: AuthComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
