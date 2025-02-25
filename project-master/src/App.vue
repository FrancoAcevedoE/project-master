<template>
  <div id="app">
    <TemplateBackground>
      <router-view />
    </TemplateBackground>
  </div>
</template>

<script>
import TemplateBackground from "@/components/TemplateBackground.vue";

export default {
  name: "App",
  components: {
    TemplateBackground,
  }
};
</script>

<style>
/* Estilos globales opcionales */
</style>
