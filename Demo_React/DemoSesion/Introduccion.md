# Sesiones

## Descripcion

Es un mecanismo que mantiene el estado entre múltiples peticiones http de un mismo usuario. Debido a que Http es un protocolo sin estado. Por tanto, la sesión es un contexto temporal asociado a un usuario que permite:

* Identificar al usuario
* Guardar información relevante
* Dar continuidad a la interacción

## Como funciona una sesión

Cliente --> login
Servidor --> Crea un ID de sesión del cliente (ID-xyz123)
Cliente --> Guarda el ID de sesión (ej. una cookie, ID=xyz123)

Cliente --> En cada nueva petición envía la cookie con el ID de sesión
Servidor --> Busca el ID de sesión y reconoce al usuario (ID=xyz123)

## Puntos claves

* La sesión se guarda en el servidor y contiene los datos del usuario
* La cookie se guarda en el cliente y contiene el ID de sesion

## Como se almacena en el cliente

* localStorage --> accesible via JS
* sesionStorage --> util para estados intermedios, se elimina al cerrar las pestañas
* Variables en memoria de JS --> No es persistente
* IndexDB --> Base de datos del navegador web
* cookie --> Es configurable y de mayor nivel de seguridad con httpOnly



