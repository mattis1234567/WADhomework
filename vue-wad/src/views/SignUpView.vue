<template>
    <Header></Header>
    <main>
        <form @submit.prevent="goHome">
            <div class="form-title">
                <h1>Welcome to PostIt</h1>
                <router-link to="/signup">Create an account</router-link>
                <p>or<br>Please log in</p>
            </div>
            <input type="email" name="email" id="femail" placeholder="Email" required> <br>
            <input type="password" id="fpass" placeholder="Password" required minlength="8"> <br>
            <input type="submit" value="Log in"> <br>
            <div class="form-forgot-password">
                <router-link to="/">Forget password</router-link>
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
    },
    methods: {
        goHome() {
        this.$router.push('/');
        }
    }
};
</script>
<style scoped>
form {
	width: 100%;
	padding: 1em;
	margin: 1em 0;
	background-color: var(--background-color);
	border-radius: 10px;
}

form textarea {
    width: 100%;
    height: 25vh;
    padding: 1em;
    resize: none;
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