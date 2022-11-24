
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Device } from '../device.model';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.css']
})
export class DeviceEditComponent implements OnInit {

  id: number;
  editMode = false;
  deviceForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private deviceService: DeviceService,
    private router: Router

  ) { }

  ngOnInit() {
    const id = this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);
        this.initForm();


      });
  }
  onSubmit() {
    const newDevice = new Device(
      this.deviceForm.value['name'],
      this.deviceForm.value['description'],
      this.deviceForm.value['imagePath'],
      this.deviceForm.value['accessories']);

    if (this.editMode) {
      //update
      this.deviceService.updateDevice(this.id, newDevice);
      //or this.deleteForm.value
    }
    //add
    else {
      this.deviceService.addDevice(newDevice);
    }
    this.onCancel();
  }

  getControls() {
    return (<FormArray>this.deviceForm.get('accessories')).controls;
  }

   onAddDevice() {
    (<FormArray>this.deviceForm.get('accessories')).
      push(new FormGroup({
        'name': new FormControl(null, Validators.required),
        'quantity': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
      )
  }

  onDeleteAccessory(index: number) {
    (<FormArray>this.deviceForm.get('accessories')).removeAt(index);

    //  (<FormArray>this.deleteForm.get('accessories')).clear();
  }
  onCancel() {

    this.router.navigate(['../'], { relativeTo: this.route });

  }
  private initForm() {

    let deviceName = '';
    let deviceImagePath = '';
    let deviceDescription = '';
    let deviceAccessories = new FormArray([]);

    //edit for existing
    if (this.editMode) {
      const device = this.deviceService.getDevice(this.id);
      deviceName = device.name;
      deviceImagePath = device.imagePath;
      deviceDescription = device.description;
      if (device['accessories']) {
        for (let accessory of device.accessories) {
          deviceAccessories.push(
            new FormGroup({
              'name': new FormControl(accessory.name, Validators.required),
              'quantity': new FormControl(accessory.quantity, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }

    }

    this.deviceForm = new FormGroup({

      'name': new FormControl(deviceName, Validators.required),
      'imagePath': new FormControl(deviceImagePath, Validators.required),
      'description': new FormControl(deviceDescription, Validators.required),
      'accessories': deviceAccessories
    });


  }


}
