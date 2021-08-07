import { apiPirataResponse } from './../pirataTraducaoResponse';
import { PirateService } from './../pirate.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tradutor',
  templateUrl: './tradutor.component.html',
  styleUrls: ['./tradutor.component.css'],
})
export class TradutorComponent implements OnInit {
  tradutor!: FormGroup;

  progress = 0;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;

  constructor(
    private formsBuilder: FormBuilder,
    private apiPirata: PirateService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tradutor = this.formsBuilder.group({
      textInput: [null, Validators.required],
      response: [null],
    });
  }

  onSubmit() {
    console.log(this.tradutor)
    if (this.tradutor.valid) {
      this.apiPirata
        .buscarText(this.tradutor.get('textInput')?.value)
        .subscribe(
          (dados: apiPirataResponse) => {
            this.tradutor.get('response')?.setValue(dados.contents.translated);
            this._snackBar.open('Successfully translated!', 'X', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: this.durationInSeconds * 1000,
            });
            this.progress = 100;
          },
          (error: any) => {
            this._snackBar.open('Something is wrong!', 'X', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
        );
    } else {
      this._snackBar.open('Form is invalid!', 'X', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}
