<template>
  <router-view/>
</template>

<style>
:root {
  font-family: Helvetica, Arial, sans-serif;
	--primary-color: #a5faa8;
	--primary-color-darkened: #94e896;
	--primary-color-hover: #64fa69;
	--background-color: #d4fed5;
	--uniform-shadow: 0 0px 10px 1px rgba(0,0,0,0.3);
}
* {
	font-family: sans-serif;
	box-sizing: border-box;
}
body {
	text-align: center;
	background-color: #eeeded;
	max-width: min(100%, clamp(600px, 60vw, 1200px));
	margin: 0 auto;
	padding: 1em;
}

main {
	margin: 0 auto;
	padding: 1em;
}
</style>
