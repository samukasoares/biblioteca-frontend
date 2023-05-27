<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@font-face {
    font-family: 'montserrat';
    src: local("Montserrat"),
        url(./assets/fonts/Montserrat-Regular.ttf)format("truetype");
}

*{
  font-family: montserrat;
  margin:0px;
  padding: 0px;
}

body{
  background-color: aliceblue;
}
</style>
