<template>
    <Header></Header>
    <main>
        <form action="index.html">
            <textarea name="" id="fpostbody" required placeholder="What do you want to write about?"></textarea> <br>
            <label for="fselectedfile" class="file-link">Attach an image</label>
            <input type="file" name="fselectedfile" id="fselectedfile" accept="image/png, image/jpeg" class="file-input"><br>
            <input type="submit" value="Create post" id="fsubmit">
        </form>
    </main>
    <Footer></Footer>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
    name: 'AddPostView',
    components: {
        Header,
        Footer
    }
}
</script>
<style>
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
form {
	width: 100%;
	padding: 1em;
	margin: 0em;
	background-color: var(--background-color);
	border-radius: 10px;
}

form textarea {
    width: 100%;
    height: 25vh;
    padding: 1em;
    resize: none;
}

.file-input {
	display: none;
}

.file-link {
	display: inline-block;
	margin: 1em 0;
	color: teal;
	text-decoration: underline;
	cursor: pointer;
}
</style>