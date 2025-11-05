<template>
    <footer>
        <p>Made by Martin Maikov and Mattis Vrager</p>
    </footer>
</template>
<script>
export default {
    name: 'Footer'
}
</script>
<style scoped>
footer {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--primary-color);
	border-radius: 20px;
	border: none;
	padding: 1em;
	box-shadow: var(--uniform-shadow);
}
</style>