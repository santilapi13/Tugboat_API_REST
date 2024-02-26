# api-sistema-puerto

# Endpoints
## BANDERAS
- GET en /api/banderas
- GET en /api/banderas/:cod_bandera

## BUQUES
- GET en /api/buques
- GET en /api/buques/:cod_buque

## CAPITANES
- GET en /api/capitanes
- GET en /api/capitanes/:cod_capitan

## MANIOBRAS
- GET en /api/maniobras
- GET en /api/maniobras/:cod_maniobra

## REMOLCADORES
- GET en /api/remolcadores
- GET en /api/remolcadores/:cod_remolcador

## SOLICITANTES
- GET en /api/solicitantes
- GET en /api/solicitantes/:cod_solicitante

## TRIPULANTES
- GET en /api/tripulantes
- GET en /api/tripulantes/:cod_tripulante

## PARTES
- GET en /api/partes:
Tiene los query params: 'cod_remolcador', 'cod_buque', 'cod_solicitante', 'confirmado', 'facturado'. Recibe los códigos de cada uno o 'true' o 'false' en caso de 'confirmado' y 'facturado'. Devuelve todos los que cumplan (sin limit) y ordena por hora_inicio descendente.

- POST en /api/partes:
```
{
   cod_remolcador: <cod_remolcador>,
   cod_buque: <cod_buque>,
   hora_inicio: <Date de inicio>,
   hora_fin: <Date de finalizacion>,
   cod_solicitante: <cod_solicitante>,
   cod_bandera: <cod_bandera>,
   observaciones: <String con las observaciones>,   // OPCIONAL
   practico: <practico>,   // OPCIONAL
   otra_embarcacion: <String con el nombre de la otra embarcacion>   // OPCIONAL    
}
```
Al realizar este POST, automáticamente se añade al array de partes del día correspondiente.

- POST en /api/partes/pendientes:
```
{
   cod_remolcador: <cod_remolcador>,
   partes: [
      {
         cod_buque: <cod_buque>,
   hora_inicio: <Date de inicio>,
   hora_fin: <Date de finalizacion>,
   cod_solicitante: <cod_solicitante>,
   cod_bandera: <cod_bandera>,
   observaciones: <String con las observaciones>,   // OPCIONAL
   practico: <practico>,   // OPCIONAL
   otra_embarcacion: <String con el nombre de la otra embarcacion>   // OPCIONAL
      },
      ... 
   ]   
}
```
Funciona igual que el post individual pero se pasa un array de partes correspondientes a un mismo remolcador. Como resultado, se recibe:
En caso de error:
```
{ creationStatus: "error", parte: parte, error: "bad request", message: error.message }
{ creationStatus: "error", parte: parte, error: "server internal error", message: error.message }
```
En caso de éxito:
```
{ creationStatus: "success", parte: parte, payload}
```

- PUT en /api/partes/:cod_parte:
Se envían en el body sólo aquellas propiedades a cambiar (con igual formato que el POST). Pueden ser "cod_buque", "cod_maniobra", "cod_solicitante", "cod_bandera".

- PUT en /api/partes/:cod_parte/confirmacion:
Si parte.confirmado es true, pasa a ser false y viceversa.

- PUT en /api/partes/:cod_parte/facturacion:
Si parte.facturado es true, pasa a ser false y viceversa.

## DIAS
- GET en /api/dias:
Siempre ordenado descendentemente (desde el día más actual al más viejo). Existe un único día para una misma fecha y mismo remolcador. Tiene 3 query params:
fecha:  Devuelve los días de la fecha especificada. Debe ser un string de formato “yyyy-mm-dd”.
cod_remolcador: Devuelve los días del remolcador especificado. 
limit: Devuelve la cantidad de días especificada. En caso de no especificarlo, por defecto devuelve los últimos 7 días.

- POST en /api/dias:
```
{ 
   fecha: <fecha actual en formato yyyy-mm-dd>, 
   tripulacion: [
      { 
         tripulante: <cod_tripulante>, 
         cargo: <Patrón|Maquinista|Engrasador|Marinero> 
      }, 
      ... 
   ], 
   feriado: <true o false dependiendo de si es feriado>,
   cod_remolcador: <código del remolcador> 
}
```
La API transforma el cod_tripulante a _id en caso de trabajar con mongodb, pero desde el front ese _id no existe.

- PUT en /api/dias/:
La idea es pasar la nueva tripulación (volver a pasar la que se mantuvo) y el nuevo valor del feriado (o el mismo en caso de que no cambie). SIEMPRE se pisa todo lo anterior. La fecha se pasa como param en formato yyyy-mm-dd.
```
{
   fecha: <fecha en formato yyyy-mm-dd>,
   cod_remolcador: <codigo del remolcador>
   tripulacion: [
      { 
         tripulante: <cod_tripulante>, 
         cargo: <Patrón|Maquinista|Engrasador|Marinero> 
      }, 
      ... 
   ], 
   feriado: <true o false dependiendo de si es feriado> 
}
```

## SESSIONS
 - POST en /api/sessions/signup:
Requiere estar logueado como admin. Registra un nuevo usuario bajo el rol indicado. Como resultado almacena en la aplicación una cookie con su authToken, que expira luego de 1 h, firmada con JWT.
Body:
```
{
   username: <nombre de usuario>,
   password: <contraseña>,
   role: <ADMIN | CAPITAN | SUPERVISOR | CONTADOR>
}
```

 - POST en /api/sessions/login:
No requiere permisos de ningún tipo.
Body:
```
{
   username: <nombre de usuario ya registrado>,
   password: <contraseña>,
}
```

## USERS
- GET en /api/users

