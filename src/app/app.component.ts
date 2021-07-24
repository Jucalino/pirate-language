import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Pirata } from './pirataTraducaoResponse';
import { PirateService } from './pirate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'pirata';
  constructor(
    private apiPirata: PirateService,
    private formsBuilder: FormBuilder
  ) {}

  @Input() mostrarErro: boolean = false;
  @Input() msgErro: string = '' ;

  pirata!: Observable<Pirata[]>;
  tradutor!: FormGroup;
  resposta!: FormGroup;

  ngOnInit() {
    this.tradutor = this.formsBuilder.group({
      text: [null, Validators.required],
    });
    this.resposta = this.formsBuilder.group({
      response: [null, Validators.required],
    });
  }

  onSubmit() {
    this.apiPirata.translate(this.tradutor.get('text')?.value).subscribe(
      (dados: Pirata) => {
        console.log(dados);
        this.resposta.get('response')?.setValue(dados.contents.translated);
      },
      (error: any) => {
        alert('Algo está errado');
      }
    );
  }
}
