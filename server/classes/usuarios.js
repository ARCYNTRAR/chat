// =====================================================
//    				 Ejemplo Usuario
// =====================================================
// {
//     id: 'AFDSIFDSFKJHSDFKJ-fdasfas54',
//     nombre: 'Arcy',
//     sala: 'Video Juegos'
// }
// =====================================================
//    				 Classes
// =====================================================
class Usuarios {

    constructor(){

        this.personasConectadas = [];

    }

    agregarPersona( id, nombre, sala ){

        let persona = { id, nombre, sala };
        
        this.personasConectadas.push( persona );

        return this.personasConectadas;

    }

    obtenerPersona( id ){

        let persona = this.personasConectadas.filter( personaBuscada => personaBuscada.id === id)[0];

        return persona;

    }

    obtenerPersonas(){

        return this.personasConectadas;

    }

    obtenerPersonasPorSala( sala ){

        let personasEnSala = this.personasConectadas.filter( persona => persona.sala === sala );

        return personasEnSala;

    }

    desconectarPersona( id ){

        let personaDesconectada = this.obtenerPersona( id );

        this.personasConectadas = this.personasConectadas.filter( personaBuscada => personaBuscada.id != id );

        return personaDesconectada;

    }

};
// =====================================================
//    				 Exportacion
// =====================================================
module.exports = {
    Usuarios
}