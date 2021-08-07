import { ApiPirataResponse } from './../pirataTraducaoResponse';
import { PirateService } from './../pirate.service';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tradutor',
  templateUrl: './tradutor.component.html',
  styleUrls: ['./tradutor.component.css'],
})
export class TradutorComponent implements OnInit {
  tradutorForm!: FormGroup;

  progress: boolean = false;

  constructor(
    private formsBuilder: FormBuilder,
    private apiPirata: PirateService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tradutorForm = this.formsBuilder.group({
      texto: [null, Validators.required],
      textoTraduzido: [null],
    });
  }

  onSubmit() {
    if (this.tradutorForm.valid) {
      this.progress = true
      this.apiPirata
        .traduzir(this.tradutorForm.get('texto')?.value)
        .subscribe(
          (dados: ApiPirataResponse) => {
            this.tradutorForm.get('textoTraduzido')?.setValue(dados.contents.translated);
            this._snackBar.open('Successfully translated!', 'X', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 3000,
            });
            this.progress = false;
          },
          (error: any) => {
            this.progress = false;
            this._snackBar.open('Something is wrong!', 'X', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          }
        );
    } else {
      this._snackBar.open('Form is invalid!', 'X', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  }
}
