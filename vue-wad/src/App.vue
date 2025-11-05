<template>
  <router-view/>
</template>

<style>

:root {
	--primary-color: #a5faa8;
	--primary-color-darkened: #94e896;
	--primary-color-hover: #64fa69;
	--background-color: #d4fed5;
	--uniform-shadow: 0 0px 10px 1px rgba(0,0,0,0.3);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
