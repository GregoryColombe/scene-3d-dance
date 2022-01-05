<template>
  <button
    class="btn"
    @click="$WebGL.camera.moveCamera(user)"
  >
    {{ user }}
  </button>
</template>

<script src="./script.js" />
<style src="./style.scss" lang="scss" scoped />
