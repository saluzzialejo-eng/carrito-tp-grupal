# PETSHOP

Trabajo práctico de Programación II. Tecnicatura Universitaria en Programación, UTN Facultad Regional Rosario.

Integrantes: Alejo Saluzzi, Mariana Di Stefano

## Descripción

Sitio de un petshop de barrio. La idea fue armar una tienda de productos para mascotas con un sistema de turnos para los servicios de peluquería, baño y veterinaria.

El sitio tiene cuatro páginas:

- Inicio: catálogo de productos dividido en juguetes, comida y accesorios
- Nosotros: historia del local
- Contacto: formulario para pedir un turno y listado de los turnos guardados
- Carrito: maquetado de la vista de compra

Los turnos se guardan en el navegador con localStorage.

## Tecnologías

- HTML5 semántico
- CSS3 con Flexbox y Grid, sin frameworks
- JavaScript, manipulación del DOM y localStorage
- Nomenclatura BEM para las clases

## Cómo ejecutarlo

1. Clonar el repositorio con `git clone https://github.com/saluzzialejo-eng/carrito-tp-grupal.git`
2. Abrir `index.html` en el navegador

No hace falta instalar nada ni levantar un servidor.

## Funcionalidades implementadas

- Cuatro páginas con estructura semántica: header, nav, main y footer
- Maquetación con Flexbox en el nav y el hero, y Grid en el catálogo, el footer y el formulario
- Favicon propio
- Formulario de turnos con siete campos: texto, email, teléfono, fecha, dos select y un grupo de radios
- Validación en tiempo real mientras se escribe, con borde de color, ícono de estado y mensaje bajo cada campo
- Validación cruzada: la fecha no puede ser anterior a hoy, no se aceptan domingos porque el local cierra, y no se permiten dos turnos del mismo servicio en la misma fecha y franja
- CRUD completo con localStorage: los turnos se guardan, se listan, se pueden editar cargándolos de nuevo en el formulario, y se pueden eliminar
- Diseño responsive con tres breakpoints: escritorio, tablet hasta 1024px y celular hasta 480px
- Menú hamburguesa animado en tablet y celular
- Animación de entrada del formulario con @keyframes
- Micro-interacciones de hover, focus y active en links, botones y tarjetas


## Estructura del proyecto

```
/
├── README.md
├── index.html
├── nosotros.html
├── contacto.html
├── carrito.html
├── css/
│   ├── style.css
│   ├── cards.css
│   ├── nosotros.css
│   ├── contacto.css
│   └── carrito.css
├── JS/
│   ├── main.js
│   └── hamburguesa.js
└── img/
```
