<template>
  <div> <- Selecciona uno de los modulos de la izquierda</div>
</template>
<script>
  export default {
    created() {
      this.$emit("load_data", {
        show: false
      });
    }
  }
</script>
