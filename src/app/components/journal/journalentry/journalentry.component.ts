import { JournalEntry } from '../../../_models/JournalEntry';
import { JournalService } from '../../../_services/journal.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Uuid } from '../../../_functions/uuid';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-journalentry',
  templateUrl: './journalentry.component.html',
  styleUrls: ['./journalentry.component.css']
})
export class JournalEntryComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;
  warning: string;
  bookingJson: JournalEntry[];

  journalEntryForm: FormGroup;

  journalEntryHeaderForm: FormGroup;
  entryHeaderLocked: boolean;
  descriptionAsHeader: string;
  dateAsHeader: Date;
  tabHeading: string;

  btnAddOrEdit: string;

  isNew = true;

  readyForBooking = false;
  totalSolde: number;
  countEntries: number;

  constructor(
    private journalService: JournalService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-blue',
      dateInputFormat: 'DD-MM-YYYY'
    };

    // First try to grab description and date if there is a session available
    if (localStorage.getItem('journalEntries') === null) {
      this.tabHeading = 'New Daybook Entry';
      this.descriptionAsHeader = null;
      this.dateAsHeader = null;
      this.entryHeaderLocked = false;
    } else {
      this.bookingJson = JSON.parse(localStorage.getItem('journalEntries'));
      if (this.bookingJson.length === 0) {
        this.tabHeading = 'New Daybook Entry';
        localStorage.removeItem('journalEntries');
        this.descriptionAsHeader = null;
        this.dateAsHeader = null;
        this.entryHeaderLocked = false;
      } else {
        this.descriptionAsHeader = this.bookingJson[0].description;
        this.tabHeading = this.bookingJson[0].description;
        this.dateAsHeader = this.bookingJson[0].date;
        this.entryHeaderLocked = true;
        this.tabHeading = this.descriptionAsHeader;
        if (this.tabHeading.length > 13) {
          this.tabHeading = this.tabHeading.substring(0, 13) + '...';
        }
      }
    }
    this.journalEntryHeaderForm = this.fb.group({
      description: [this.descriptionAsHeader, Validators.required],
      date: [this.dateAsHeader, Validators.required]
    });

    // Subscribe to the selectedLog observable
    this.journalService.selectedJournalEntry.subscribe(
      (entry: JournalEntry) => {
        if (entry.id !== null) {
          this.btnAddOrEdit = 'Edit';

          this.journalEntryForm = this.fb.group({
            id: [entry.id],
            description: [entry.description, Validators.required],
            date: [entry.date, Validators.required],
            dcOption: [entry.dcOption, Validators.required],
            amount: [entry.amount, Validators.required],
            bNumber: [entry.bNumber, Validators.required],
            tNumber: [entry.tNumber]
          });
          this.isNew = false;
        } else {
          this.btnAddOrEdit = 'Add';
          this.clearState();
        }
      }
    );
  }

  onHeaderLock() {
    this.descriptionAsHeader = this.journalEntryHeaderForm.value.description;
    this.dateAsHeader = this.journalEntryHeaderForm.value.date;
    this.tabHeading = this.descriptionAsHeader;
    if (this.tabHeading.length > 15) {
      this.tabHeading = this.tabHeading.substring(0, 15) + '...';
    }
    this.entryHeaderLocked = true;
    this.clearState();
  }

  onSubmit() {
    if (this.journalEntryForm.valid) {
      const journalEntry: JournalEntry = Object.assign(
        {},
        this.journalEntryForm.value
      );
      if (this.isNew) {
        this.journalService.addJournalEntry(journalEntry);
      } else {
        if (journalEntry.dcOption === 'T' && journalEntry.tNumber === null) {
          this.warning =
            'no contra account given when changing... No changes made!';
        } else {
          this.journalService.updateJournalEntry(journalEntry);
        }
      }
    }

    // Clear state
    this.clearState();
    // this.ngOnInit();
  }

  clearState() {
    this.isNew = true;
    this.readyForBooking = false;
    this.totalSolde = null;

    this.journalEntryForm = this.fb.group({
      id: Uuid(),
      description: [this.descriptionAsHeader, Validators.required],
      date: [this.dateAsHeader, Validators.required],
      dcOption: [null, Validators.required],
      amount: [null, Validators.required],
      bNumber: [null, Validators.required],
      tNumber: [null]
    });
    this.journalService.clearState();
  }

  clearEntry() {
    if (confirm('Are you sure?')) {
      localStorage.removeItem('journalEntries');
      this.bookingJson = null;
      this.entryHeaderLocked = false;
    }
  }

  checkBalance() {
    this.bookingJson = JSON.parse(localStorage.getItem('journalEntries'));
    if (this.bookingJson.length !== 0) {
      this.countEntries = 0;
      this.totalSolde = 0;
      while (this.countEntries < this.bookingJson.length) {
        const thisEntry: JournalEntry = this.bookingJson[this.countEntries];
        const value = Number(thisEntry.amount);
        switch (thisEntry.dcOption.substring(0, 1)) {
          case 'D':
            this.totalSolde = this.totalSolde + value;
            break; // debit

          case 'C':
            this.totalSolde = this.totalSolde - value;
            break; // credit

          case 'T':
            break; // with t bookingnumber
        }

        this.countEntries++;
      }

      if (this.totalSolde === 0) {
        this.readyForBooking = true;
      } else {
        this.readyForBooking = false;
      }
    }
  }

  onBooking() {
    if (confirm('Are you sure?')) {
      // send to booking API
    }
  }
}
