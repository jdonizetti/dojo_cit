import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { HttpHeaders, HttpResponse } from '@angular/common/http'
import { Guid } from 'guid-typescript'

declare let guid


import { Observable } from 'rxjs/Observable'
import { Musica } from './models/musica.model';
import { PlaylistMusicasModel } from './models/playlistMusicasModel.model';
import { Playlist } from './models/playlist.model';

@Injectable()
export class MusicaService {

    constructor(private http: Http) {


    }

    public urlService: string = 'https://intense-ocean-93206.herokuapp.com/api/'

    public getMusicas(filter: string): Promise<any> {
        let apiUrl = this.urlService + "musicas/?filtro=" + filter;

        return this.http.get(apiUrl).toPromise();
    }

    public getPlaylists(usuario: string): Promise<any> {
        let apiUrl = this.urlService + "playlists/?user=" + usuario;

        return this.http.get(apiUrl).toPromise();
    }

    public putPlayList(playlist: Playlist) {
        
        let apiUrl = this.urlService + "playlists/" + playlist.id + "/musicas";

        return this.http.put(apiUrl, playlist.getMusicas());
    }

    public converterPlaylistParaModel(musicas:Array<Musica>, idPlaylist:string) {
        let retorno = new Array<PlaylistMusicasModel>();
        musicas.forEach(musica => {
            let play = new PlaylistMusicasModel();
            play.musica = musica;
            play.musicaId = musica.id;
            play.playlistId = idPlaylist;
            retorno.push(play);
        });
        return retorno;
    }

}