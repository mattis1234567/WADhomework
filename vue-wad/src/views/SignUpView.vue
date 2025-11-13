<template>
    <Header></Header>
    <main>
        <form action="index.html">
            <div class="form-title">
                <h1>Welcome to PostIt</h1>
                <a href="">Create an account</a>
                <p>or<br>Please log in</p>
            </div>
            <input type="email" name="email" id="femail" placeholder="Email" required> <br>
            <input type="password" name="password" id="fpass" placeholder="Password" required> <br>
            <input type="submit" value="Log in"> <br>
            <div class="form-forgot-password">
                <a href="">Forget password</a>
            </div>
        </form>
    </main>
    <Footer></Footer>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
    name: 'SignUpView',
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
form input[type="submit"], form input[type="file"] {
	margin-top: 0em;
}

form input[type="email"], form input[type="password"] {
	margin: 0.2em 0;
	width: 100%;
	line-height: 32px;
}

form input[type="submit"] {
	margin-top: 0.5em;
    background-color: var(--primary-color);
	width: 100%;
	padding: 0.75em;
	font-size: 1rem;
	border: none;
	border-radius: 8px;
	transition: background-color 0.2s linear;
}

form input[type="submit"]:hover {
	background-color: var(--primary-color-hover);
}

form a {
	color: teal;
}

.form-forgot-password {
	margin-top: 1em;
}
</style>