import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.heroe = new HeroeModel();
   }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id !== 'new') {
      this.heroesService.getHeroe(id).subscribe(heroe => {
        if (heroe) {
          this.heroe = heroe;
          heroe.id = id;
        } else {
          this.router.navigate(['heroes']);
        }
      });
    }
  }

  saveHeroe(form: NgForm): void {
    if (form.invalid) {
      console.log('Formulario inválido');
      form.control.markAllAsTouched();
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando héroe',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let petition: Observable<any>;

    if (this.heroe.id) {
      petition = this.heroesService.updateHeroe(this.heroe);
    } else {
      petition = this.heroesService.createHeroe(this.heroe);
    }

    petition.subscribe(
      heroe => {
        Swal.fire({
          title: heroe.name,
          text: 'Guardado correctamente',
          icon: 'success',
        });
        this.router.navigate(['heroes']);
      }
    );

  }

}
