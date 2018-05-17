import { Component, OnInit } from '@angular/core';
import { MusicaService } from '../musicas.service';


import { Observable } from 'rxjs/Rx';
import { Playlist } from '../models/playlist.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  musicas: any;
  musicasPlaylist: Array<any> = new Array<any>();
  musicasSelecionadas: Array<any> = new Array<any>();
  musicasSelecionadasRemocao: Array<any> = new Array<any>();
  usuario: string
  playlistUsuario: Playlist

  constructor(private musicaService: MusicaService) { }


  ngOnInit() {

  }

  public atualizarPlaylist(musica: any) {
    if (musica == null) {
      if (this.musicasSelecionadas.length > 0) {
        this.musicasSelecionadas = [];
      } else {
        this.musicas.forEach(element => {
          this.musicasSelecionadas.push(element);
        });
      }

    } else {
      let index = this.musicasSelecionadas.indexOf(musica)
      if (index < 0) {
        this.musicasSelecionadas.push(musica);
      } else {
        this.musicasSelecionadas.splice(index, 1)
      }
    }
    console.log(this.musicasSelecionadas);
  }

  criaPlaylist() {

    this.playlistUsuario.playlistaMusicas = this.musicaService.converterPlaylistParaModel(this.musicasSelecionadas, this.playlistUsuario.id);
    this.musicaService.putPlayList(this.playlistUsuario)
      .toPromise().then((resposta: any) => {
        console.log(resposta);
        if (resposta.status == "200") {

        }
      })
  }

  removerMusicas() {
    this.musicasSelecionadasRemocao.forEach((musica) => {
      let index = this.musicasPlaylist.indexOf(musica);
      if (index >= 0) {
        this.musicasPlaylist.splice(index, 1);
      }
    })

  }

  public marcaMusicaRemocao(musica: any) {
    let index = this.musicasSelecionadasRemocao.indexOf(musica);
    if (index >= 0) {
      this.musicasSelecionadasRemocao.splice(index, 1);
    } else {
      this.musicasSelecionadasRemocao.push(musica);
    }
  }

  public receberMusicas(result: any) {
    this.musicas = result;
  }

  public selecionarUsuarioPlayList(result: Playlist) {
    console.log(result);
    this.musicasPlaylist = result.getMusicas();
    this.playlistUsuario = result;    

  }
}
