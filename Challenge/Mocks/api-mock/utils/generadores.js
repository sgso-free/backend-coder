import {faker} from '@faker-js/faker/locale/es_MX'

const {name,internet,color} = faker

export function generarUsuarioFake() {
    return{
        nombre:name.fullName(),
        email:internet.email(),
        website:internet.url(),
        imagen:internet.avatar()
    }
}