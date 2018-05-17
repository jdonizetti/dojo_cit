import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MusicaService }  from '../musicas.service'
@Component({
  selector: 'app-pesquisa-musica',
  templateUrl: './pesquisa-musica.component.html',
  styleUrls: ['./pesquisa-musica.component.css']
})
export class PesquisaMusicaComponent implements OnInit {

  @Output() pesquisarMusica = new EventEmitter();

  constructor(private musicaService: MusicaService) { }

  ngOnInit() {
  }

  public "nome-musica": string = null;

  public pesquisar(evento: any) {    
    let nomeMusica = evento.target.value;
    if (nomeMusica.length > 3 && evento.keyCode === 13) {      
      this.musicaService.getMusicas(nomeMusica)
        .then((result: any) => {
          this.pesquisarMusica.emit(result.json())        
      });
    }
  }
}
