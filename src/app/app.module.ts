import { HttpClientModule } from '@angular/common/http';
import { DomEntriesComponent } from './components/customers/domentries/domentries.component';
import { DomEntryComponent } from './components/customers/domentry/domentry.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';

import { JournalService } from './_services/journal.service';
import { JournalEntryComponent } from './components/journal/journalentry/journalentry.component';
import { JournalEntriesComponent } from './components/journal/journalentries/journalentries.component';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DomComponent } from './components/dom/dom.component';
import { DomService } from './_services/dom.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JournalEntryComponent,
    JournalEntriesComponent,
    DomEntryComponent,
    DomEntriesComponent,
    DomComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [JournalService, DomService],
  bootstrap: [AppComponent]
})
export class AppModule {}
