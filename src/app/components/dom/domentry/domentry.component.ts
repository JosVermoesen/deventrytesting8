import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TabsetComponent, BsModalRef, BsModalService } from 'ngx-bootstrap';

import { Uuid } from '../../../_functions/uuid';
import { DomService } from '../../../_services/dom.service';
import { DomEntry } from '../../../_models/domEntry';
import { DomSettingsComponent } from './../domsettings/domsettings.component';
import { DomExportComponent } from './../domexport/domexport.component';

@Component({
  selector: 'app-domentry',
  templateUrl: './domentry.component.html',
  styleUrls: ['./domentry.component.css']
})
export class DomEntryComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  bsModalRef: BsModalRef;

  warning: string;
  domJson: DomEntry[];
  entryCount: number;

  domEntryForm: FormGroup;

  btnAddOrEdit: string;
  isNew = true;

  readyForExport = false;
  countEntries: number;

  constructor(
    private domService: DomService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.domJson = JSON.parse(localStorage.getItem('domEntries_Template'));
    // Subscribe to the selectedLog observable
    this.domService.selectedDomEntry.subscribe((entry: DomEntry) => {
      if (entry.id !== null) {
        this.btnAddOrEdit = 'Edit';
        this.selectTab(1);

        this.domEntryForm = this.fb.group({
          id: [entry.id],
          endToEndReference: [entry.endToEndReference, Validators.required],
          amount: [
            entry.amount,
            [Validators.required, Validators.min(0.01), Validators.max(3000)]
          ],
          mandateId: [entry.mandateId, Validators.required],
          mandateStartDate: [entry.mandateStartDate, Validators.required],
          clientName: [entry.clientName, Validators.required],
          clientIban: [entry.clientIban, Validators.required],
          communication: [entry.communication, Validators.required]
        });
        this.isNew = false;
      } else {
        this.clearState();
      }
    });
  }

  openModalSettings() {
    const initialState = {
      title: 'Direct Debit Settings'
    };
    this.bsModalRef = this.modalService.show(DomSettingsComponent, {
      initialState
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  openModalExport() {
    const initialState = {
      title: 'Direct Debit Export XML'
    };
    this.bsModalRef = this.modalService.show(DomExportComponent, {
      initialState
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  onSubmit() {
    if (this.domEntryForm.valid) {
      const domEntry: DomEntry = Object.assign({}, this.domEntryForm.value);
      if (this.isNew) {
        this.domService.addDomEntry(domEntry);
      } else {
        this.domService.updateDomEntry(domEntry);
      }
    }
    this.selectTab(0);
    this.clearState();
  }

  clearState() {
    this.isNew = true;
    this.btnAddOrEdit = 'Add';
    this.readyForExport = false;

    this.domEntryForm = this.fb.group({
      id: Uuid(),
      endToEndReference: [null, Validators.required],
      amount: [
        null,
        [Validators.required, Validators.min(0.01), Validators.max(3000)]
      ],
      mandateId: [null, Validators.required],
      mandateStartDate: [null, Validators.required],
      clientName: [null, Validators.required],
      clientIban: [null, Validators.required],
      communication: [null, Validators.required]
    });
    this.domService.clearState();
    this.domJson = JSON.parse(localStorage.getItem('domEntries_Template'));
    if (this.domJson == null) {
      this.entryCount = 0;
    } else {
      this.entryCount = this.domJson.length;
    }
  }
}
