import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap';

import { DomCompany } from './../../../_models/domCompany';

@Component({
  selector: 'app-domsettings',
  templateUrl: './domsettings.component.html',
  styleUrls: ['./domsettings.component.css']
})
export class DomSettingsComponent implements OnInit {
  title: string;
  closeBtnName: string;

  domSettingsForm: FormGroup;
  domSettings: DomCompany;

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit() {
    this.domSettings = JSON.parse(localStorage.getItem('domSettings_Template'));
    if (this.domSettings === null) {
      this.clearState();
    } else {
      this.domSettingsForm = this.fb.group({
        name: [this.domSettings.name, Validators.required],
        enterpriseNumber: [this.domSettings.enterpriseNumber, Validators.required],
        country: [this.domSettings.country, Validators.required],
        street: [this.domSettings.street, Validators.required],
        pcPlace: [this.domSettings.pcPlace, Validators.required],
        iban: [this.domSettings.iban, Validators.required],
        bic: [this.domSettings.bic, Validators.required],
        domId: [this.domSettings.domId, Validators.required]
      });
    }
  }

  onSubmit() {
    if (this.domSettingsForm.valid) {
      this.domSettings = this.domSettingsForm.value;
      localStorage.setItem('domSettings_Template', JSON.stringify(this.domSettings));
    }
  }

  onRead() {
    this.domSettings = JSON.parse(localStorage.getItem('domSettings_Template'));
    this.domSettingsForm = this.fb.group({
      name: [this.domSettings.name, Validators.required],
      enterpriseNumber: [this.domSettings.enterpriseNumber, Validators.required],
      country: [this.domSettings.country, Validators.required],
      street: [this.domSettings.street, Validators.required],
      pcPlace: [this.domSettings.pcPlace, Validators.required],
      iban: [this.domSettings.iban, Validators.required],
      bic: [this.domSettings.bic, Validators.required],
      domId: [this.domSettings.domId, Validators.required]
    });
  }

  clearState() {
    this.domSettingsForm = this.fb.group({
      name: ['', Validators.required],
      enterpriseNumber: ['', Validators.required],
      country: ['', Validators.required],
      street: ['', Validators.required],
      pcPlace: ['', Validators.required],
      iban: ['', Validators.required],
      bic: ['', Validators.required],
      domId: ['', Validators.required]
    });
  }
}
