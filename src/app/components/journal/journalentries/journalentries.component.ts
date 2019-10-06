import { Component, OnInit } from '@angular/core';

import { JournalService } from '../../../_services/journal.service';
import { JournalEntry } from '../../../_models/journalEntry';

@Component({
  selector: 'app-journalentries',
  templateUrl: './journalentries.component.html',
  styleUrls: ['./journalentries.component.css']
})
export class JournalEntriesComponent implements OnInit {
  journalEntries: JournalEntry[];
  selectedJournalEntry: JournalEntry;

  loaded = false;

  constructor(private journalService: JournalService) {}

  ngOnInit() {
    this.journalService.stateClear.subscribe(clear => {
      if (clear) {
        this.selectedJournalEntry = {
          id: '',
          description: '',
          date: '',
          dcOption: '',
          amount: 0,
          bNumber: '',
          tNumber: ''
        };
      }
    });

    this.journalService.getJournalEntries().subscribe(
      (result: JournalEntry[]) => {
        this.journalEntries = result;
        this.loaded = true;
      }
    );
  }

  onSelect(journalEntry: JournalEntry) {
    this.journalService.setFormJournalEntry(journalEntry);
    this.selectedJournalEntry = journalEntry;
  }

  onDelete(journalEntry: JournalEntry) {
    if (confirm('Are you sure?')) {
      this.journalService.deleteJournalEntry(journalEntry);
    }
  }

  getColor(option: string) {
    switch (option.substring(0, 1)) {
      case 'D':
        return 'blue'; // debit

      case 'C':
        return 'red'; // credit

      case 'T':
        return 'green'; // with t bookingnumber
    }
  }
}
