<template>
    <Header></Header>
    <main>
        <form @submit.prevent="checkPasswordgoHome">
            <div class="form-title">
                <h1>Welcome to PostIt</h1>
                <router-link to="/">Log in</router-link>
                <p>or<br>Please sign up</p>
            </div>
            <input type="email" name="email" id="femail" placeholder="Email" required> <br>
            <input type="password" id="fpass" placeholder="Password"> <br>
            <input type="submit" value="Sign up"> <br>
            <div class="form-forgot-password">
                <router-link to="/">Help with log in</router-link>
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
        checkPasswordgoHome() {
            const password = document.getElementById('fpass').value;

            if (!this.isValidPassword(password)) {
                return;
            }
            this.$router.push('/');
        },
        isValidPassword(password) {
            const errors = [];

            if (password.length < 8 || password.length > 14) {
                errors.push('- Password must be 8–14 characters long.');
            }

            if (!/^[A-Z]/.test(password)) {
                errors.push('- Password must start with an uppercase letter.');
            }

            if (!/[A-Z]/.test(password)) {
                errors.push('- Password must include at least one uppercase letter.');
            }

            const lowercaseMatches = password.match(/[a-z]/g) || [];
            if (lowercaseMatches.length < 2) {
                errors.push('- Password must include at least two lowercase letters.');
            }

            if (!/[0-9]/.test(password)) {
                errors.push('- Password must include at least one number.');
            }

            if (!password.includes('_')) {
                errors.push('- Password must include the character "_".');
            }

            if (errors.length > 0) {
                alert('Password is not valid:\n\n' + errors.join('\n'));
                return false;
            }

            return true;
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