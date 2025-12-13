<template>
    <Header></Header>
    <main>
        <form @submit.prevent="checkPasswordgoHome">
            <div class="form-title">
                <h1>Welcome to PostIt</h1>
                <router-link to="/signup">Sign up</router-link>
                <p>or<br>Please Log in</p>
            </div>
            <input type="email" name="email" id="femail" placeholder="Email" required> <br>
            <div class="popup" id="myPopup" @click="hidePopup">
                <span class="popuptext" style="white-space: pre-line">popup text</span>
            </div>
            <input type="password" id="fpass" placeholder="Password"> <br>
            <input type="submit" value="Log in"> <br>
        </form>
    </main>
    <Footer></Footer>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import auth from '@/auth'

export default {
    name: 'LoginView',
    components: {
        Header,
        Footer
    },
    methods: {
        checkPasswordgoHome() {
            const password = document.getElementById('fpass').value;
            const errors = this.PasswordProblems(password);

            if (errors.length > 0) {
                const popup = document.getElementById("myPopup");
                const popupText = popup.querySelector('.popuptext');

                popupText.textContent = 'Password is not valid:\n\n' + errors.join('\n');
                popup.classList.add("show");
                return;
            }
            this.hidePopup();
            this.LogIn()
        },
        LogIn() {
            const email = document.getElementById('femail').value;
            const password = document.getElementById('fpass').value;
            
            const data = { email: email, password: password };

            fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            .then((response) => {
                if (!response.ok) throw new Error("Login failed");
                return response.json();
            })
            .then((data) => {
                console.log("Logged in:", data);
                this.$router.push("/");
            })
            .catch((e) => {
                console.log(e);
                alert("Login failed! Check credentials.");
            });
        },
        hidePopup() {
            const popup = document.getElementById("myPopup");
            if (popup) {
                popup.classList.remove("show");
            }
        },
        PasswordProblems(password) {
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

            return errors;
        }
    },
	async mounted() {
        const authData = await auth.authenticated();
		if (authData.authenticated) {
            this.$router.push("/");
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

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.4);
  visibility: hidden;
  z-index: 1000;
}

.popup .popuptext {
  width: 320px;
  background-color: var(--primary-color-hover);
  border-radius: 6px;
  padding: 1em;
  text-align: left;
}

.popup.show {
  visibility: visible;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;
}

@-webkit-keyframes fadeIn {
    from {opacity: 0;} to {opacity: 1;}
} 
@keyframes fadeIn {
    from {opacity: 0;} to {opacity: 1;}
}
</style>