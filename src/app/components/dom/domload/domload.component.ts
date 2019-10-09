import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap';

import { DomEntry } from './../../../_models/domEntry';

@Component({
  selector: 'app-domload',
  templateUrl: './domload.component.html',
  styleUrls: ['./domload.component.css']
})
export class DomLoadComponent implements OnInit {
  title: string;
  closeBtnName: string;
  locationReload = false;

  domLoadForm: FormGroup;
  domJson: DomEntry[];

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit() {
    this.domLoadForm = this.fb.group({
      groupType: [null, Validators.required],
      name: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.domLoadForm.valid) {
      this.locationReload = true;
      const itemName =
        this.domLoadForm.value.groupType + this.domLoadForm.value.name;

      this.domJson = JSON.parse(localStorage.getItem(itemName));
      localStorage.setItem('domEntries_Template', JSON.stringify(this.domJson));
      location.reload();
    }
  }
}
