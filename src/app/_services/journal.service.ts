import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { JournalEntry } from '../_models/journalEntry';

@Injectable()
export class JournalService {
  journalEntries: JournalEntry[];

  private journalEntrieSource = new BehaviorSubject<JournalEntry>({
    id: null,
    description: null,
    date: null,
    dcOption: null,
    amount: 0,
    bNumber: null,
    tNumber: null
  });

  selectedJournalEntry = this.journalEntrieSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    this.journalEntries = [];
  }

  getJournalEntries(): Observable<JournalEntry[]> {
    if (localStorage.getItem('journalEntries') === null) {
      this.journalEntries = [];
    } else {
      this.journalEntries = JSON.parse(localStorage.getItem('journalEntries'));
    }

    return of(
      this.journalEntries.sort((a, b) => {
        return (b.date = a.date);
      })
    );
  }

  setFormJournalEntry(journalEntry: JournalEntry) {
    this.journalEntrieSource.next(journalEntry);
  }

  addJournalEntry(journalEntry: JournalEntry) {
    this.journalEntries.unshift(journalEntry);

    // Add to local storage
    localStorage.setItem('journalEntries', JSON.stringify(this.journalEntries));
  }

  updateJournalEntry(journalEntry: JournalEntry) {
    this.journalEntries.forEach((cur, index) => {
      if (journalEntry.id === cur.id) {
        this.journalEntries.splice(index, 1);
      }
    });
    this.journalEntries.unshift(journalEntry);

    // Update local storage
    localStorage.setItem('journalEntries', JSON.stringify(this.journalEntries));
  }

  deleteJournalEntry(journalEntry: JournalEntry) {
    this.journalEntries.forEach((cur, index) => {
      if (journalEntry.id === cur.id) {
        this.journalEntries.splice(index, 1);
      }
    });

    // Delete from local storage
    localStorage.setItem('journalEntries', JSON.stringify(this.journalEntries));
  }

  clearState() {
    this.stateSource.next(true);
  }
}
