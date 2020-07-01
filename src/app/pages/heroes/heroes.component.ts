import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: [
  ]
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[];
  loading: boolean;

  constructor(private heroesService: HeroesService) {
    this.heroes = [];
    this.loading = true;
   }

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe(
      heroes => {
        this.heroes = heroes;
        this.loading = false;
      }
    );
  }

  deleteHeroe(id: string, i: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!'
    }).then((result) => {
      if (result.value) {
        this.heroesService.deleteHeroe(id).subscribe();
        this.heroes.splice(i, 1);
        Swal.fire(
          'Eliminado!',
          'El héroe ha sido eliminado',
          'success'
        );
      }
    });
  }

}
