import { UsuarioModel } from "./usuarioModel.model";
import { PlaylistMusicasModel } from "./playlistMusicasModel.model";
import { element } from "protractor";

export class Playlist {
    id : string
    usuario : UsuarioModel
    playlistaMusicas : Array<PlaylistMusicasModel>

    getMusicas : function () {
        
    }

    public getMusicas() {
        return this.playlistaMusicas.map(element =>{
            return element.musica;
        });
    }

}