import ContenedorMemoria from "../contenedores/ContenedorMemoria.js";
import { generarUsuarioFake } from "../utils/generadores.js";


export class UserApiMock extends ContenedorMemoria {

    popular(cant=50){
        for(let i=0;i<cant;i++){
            this.guardar({id:i,...generarUsuarioFake()})
        }
    }

}