import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BeBankOk } from 'src/app/_functions/beBankOk';

@Component({
  selector: 'app-checkers',
  templateUrl: './checkers.component.html',
  styleUrls: ['./checkers.component.css']
})
export class CheckersComponent implements OnInit {
  checkersForm: FormGroup;
  result = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.checkersForm = this.fb.group({
      beBankNumber: [null, Validators.required],
      withSpaces: [false],
      sepa: [true]
    });
  }

  onSubmit() {
    if (this.checkersForm.valid) {
      this.result = BeBankOk(
        this.checkersForm.value.beBankNumber,
        this.checkersForm.value.sepa,
        this.checkersForm.value.withSpaces
      );
      console.log(this.result);
    }
  }
}
