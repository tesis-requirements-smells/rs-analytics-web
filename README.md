# Portal web RS Analytics (rs-analytics-web)
Componente de presentación que permite al usuario interactuar con el sistema Requirements Smells Analytics, Single Page Application (SPA) construido con Quasar 2.6.0 (Vue 3.X.)

## Desarrollado con

* Frameworks:
    * [Quasar Framework](https://quasar.dev/)
* Gestor de paquetes:
    * [npm (Node Package Manager)](https://docs.npmjs.com/)

## Configuración inicial
Instrucciones para configurar el proyecto localmente.

### Pre-requisitos
  * Instalar NodeJS (https://nodejs.org/es)
  * Instalar de forma global @quasar/cli:
    ```
    npm install -g @quasar/cli
    ```
  * Instalar dependencias del proyecto:
  ```
    npm install
  ```

#### Software
* IDE (Ej. Visual Studio Code)
* Node.js
* Quasar
* Git

#### Archivos de configuración
* `package.json` se encuentra la especificación de dependencias

* `tsconfig.json` se especifican las preferencias para la transpilacion de TS a JS.

* `quasar.conf.js` configuración como complementos de Quasar, bibliotecas de iconos, animaciones CSS, configuración build, etc.
[Configuring quasar.conf.js](https://v2.quasar.dev/quasar-cli/quasar-conf-js).

* `environment/.env.{AMB}` variables de entorno según el ambiente

## Cómo compilar, construir y/o crear paquete de distribución

Los comandos a continuación debem ejecutarse en la raíz del proyecto.

| Tarea                           | Comando                       | Observación                                                                                         |
|---------------------------------|-------------------------------|-----------------------------------------------------------------------------------------------------|
| Ejecutar pruebas unitarias      | NA                            |                                                                                                     |
| Ejecutar pruebas de integración | NA                            |                                                                                                     |
| Ejecutar en desarrollo          | `quasar dev`                  | Por defecto usa las variables de entorno del archivo `environment/.env.dev`                         |
| Compilar                        | `ENV_FILE={AMB} quasar build` | Ej.ENV_FILE=sit quasar build. Genera los archivos compilados del proyecto en el directorio: `/dist` |

## Gestión de configuración

## Instalación y uso
  * Comprimir el directorio dist con el comando: `tar -cvzf dist-{VERSION}.tar.gz /dist`

## Historial de versiones#
## v1.0.0
- Construcción de linea base del portal web
