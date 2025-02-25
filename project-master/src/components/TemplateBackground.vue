<template>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <div class="container-fluid bg-image"></div>
    <div class="content">
      <slot />
    </div>
  </template>
  
  <script>
  export default {
    name: "TemplateBackground",
  };
  </script>
  
  <style>
  /* Estilo para la imagen de fondo */
  .bg-image {
    position: fixed; /* Asegura que cubra toda la pantalla */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f7fff7;
    background-position: center;
    z-index: -1; /* Mantiene el fondo detrás */
  }
  
  /* Contenedor del contenido principal */
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    z-index: 10; /* Asegura que el contenido esté sobre el fondo */
    width: 500px;
    height: 100vh;
    color: white;
  }
  </style>
  