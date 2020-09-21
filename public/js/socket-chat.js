// =====================================================
//    				 Socket
// =====================================================
var socket = io();
// =====================================================
//    				 Parámetros
// =====================================================
var parametros = new URLSearchParams( window.location.search );

if( !parametros.has('nombre') || !parametros.has('sala') ){

    window.location = 'index.html';
    throw new Error('El nombre y sala es necesario');

}

var usuario = {
    nombre: parametros.get('nombre'), 
    sala:   parametros.get('sala')
};
// =====================================================
//    				 Socket metodos
// =====================================================
socket.on('connect', function() {

    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function( respuesta ){
        
        console.log('Usuarios Conectados:',respuesta);

    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

// =====================================================
//    				 Conexion y Desconexion de un usuario
// =====================================================
socket.on('listaPersonas', function(personas) {

    console.log(personas);

});


// =====================================================
//    				 Mensajes Privados
// =====================================================
socket.on('mensajePrivado', function( mensaje ){

    console.log('Mensaje Privado: ', mensaje);

});