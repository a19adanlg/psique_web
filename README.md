# INTERFAZ WEB PSIQUE - psique_web

## Instalar las dependencias necesarias

```
npm i
```

#

## NOTA:

Si al ejecutar el comando anterior nos devuelve un error de dependencias, ejecutaremos el siguiente comando:

```
npm i --legacy-peer-deps
```

o bien:

```
npm i --force
```

También podríamos ejecutar el siguiente comando para modificar la configuración de npm:

```
npm config set legacy-peer-deps true
```

para luego ejecutar el comando `npm i` con normalidad.

#

## Iniciar la interfaz web

```
npm start
```

## Compilar la aplicación para producción

```
npm run build
```

## Corregir errores en ficheros

```
npm run lint
```
