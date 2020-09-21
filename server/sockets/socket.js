// =====================================================
//    				 Socket y REQUIRED
// =====================================================
const { io }            = require('../server');
const { crearMensaje }  = require('../util/utilidades');
const { Usuarios }      = require('../classes/usuarios');


const usuarios = new Usuarios();
// =====================================================
//    		 Metodos Socket Sevidor
// =====================================================
io.on('connection', (client) => {

    client.on('entrarChat', ( data, callback ) => {

        if( !data.nombre || !data.sala ){

            return callback({

                error: true,
                mensaje: 'El nombre/sala es necesario'

            });

        }

        client.join( data.sala );

        usuarios.agregarPersona( client.id, data.nombre, data.sala );
        
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.obtenerPersonasPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${data.nombre} se ha unido al chat`));

        callback(usuarios.obtenerPersonasPorSala( data.sala )); 


    });

    client.on('crearMensaje', ( data, callback ) => {

        let persona = usuarios.obtenerPersona( client.id );

        let mensaje = crearMensaje( persona.nombre, data.mensaje );
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

        callback(mensaje);
    });

    client.on('disconnect', () => {

        let personaDesconectada = usuarios.desconectarPersona( client.id );

        client.broadcast.to(personaDesconectada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaDesconectada.nombre} abandonó el chat`));

        client.broadcast.to(personaDesconectada.sala).emit('listaPersona', usuarios.obtenerPersonasPorSala(personaDesconectada.sala) );

    });

    // =====================================================
    //    				 Mensajes Privados
    // =====================================================
    
    client.on('mensajePrivado', ( data ) => {

        let persona = usuarios.obtenerPersona( client.id );

        client.broadcast.to(data.para).emit( 'mensajePrivado', crearMensaje( persona.nombre, data.mensaje ) );

    });



});