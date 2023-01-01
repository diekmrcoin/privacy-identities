# Identidades privadas

**FOSS PWA hecho con React.**

El objetivo de ésta aplicación web es brindar almacenamiento local, _con alternativa para móvil_, de las identidades falsas utilizadas para mantener la privacidad a lo largo de los servicios que se desee.

Ejemplos:

- La identidad que le dices al repartidor para recoger un paquete en la puerta de tu casa.
- La identidad que proporcionas para registrarte en un servicio que no tiene KYC y no vas a facturar.

## Funcionalidades:

- [**X**] FOSS
- [**X**] Crear identidad con la estructura:
  - Identificador
  - Resumen
  - Nombre
  - Dni
- [**X**] Listado de identidades
- [**X**] Al crear identidad se debe poder:
  - Generar dni aleatoriamente
  - Posibilidad de decidir prefijo del dni a generar (sólo en código, no en UX)
- [**X**] Almacenamiento local en IndexedDB
- [**X**] Editar identidad
- [**X**] Eliminar identidad
- [**X**] PWA
- [**X**] AWS + Terraform
  - [**X**] S3 almacenamiento estático
  - [**X**] Cloudfront CDN
- [**X**] CI/CD

## TODO:

- [-] Crear y detalle como componentes diferentes
- [-] Exportar identidad
- [-] Ordenar identidades por nombre y fecha de creación
- [-] Almacenamiento remoto con conocimiento cero
- [-] Docker y self-hosted
- [-] AWS + Terraform
  - [-] Route53 `privacytools.diekmrcoin.com`
  - [-] ACM cert
  - [-] Lambda backend
  - [-] API Gateway
  - [-] DynamoDB backend

### Webapp color palette

- Bootstrap default colors
- Bootstrap primary
  - #0d6efd
- Bootstrap dark blue
  - #084298
- Midnight Blue [Palette example](https://www.canva.com/colors/color-palettes/window-tide/)
  - #41729F
- Blue Gray
  - #5885AF
- Dark Blue
  - #274472
- Baby Blue
  - #C3E0E5
