import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MusicaService } from '../musicas.service'


@Component({
  selector: 'app-pesquisa-playlist',
  templateUrl: './pesquisa-playlist.component.html',
  styleUrls: ['./pesquisa-playlist.component.css']
})
export class PesquisaPlaylistComponent implements OnInit {

  @Output() preencherUsuario = new EventEmitter();
  @Output() pesquisarPlaylist = new EventEmitter();

  constructor(private musicaService: MusicaService) { }

  ngOnInit() {
  }

  public pesquisar(e: any) {
    if (e.keyCode === 13) {
      this.musicaService.getPlaylists(e.target.value)
        .then((result: any) => {
          if (result.status === 200) {            
            this.pesquisarPlaylist.emit(result.json());
          } else {
            this.pesquisarPlaylist.emit(null);
          }
        });
    }
  }

}
