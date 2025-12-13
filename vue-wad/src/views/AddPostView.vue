<template>
    <Header></Header>
    <main>
        <form @submit.prevent="goHome">
            <textarea required placeholder="What do you want to write about?" v-model="post.body"></textarea> <br>
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
    components: { Header, Footer },
	data() {
		return {
			post: { body: "" }
		}
	},
	methods: {
		goHome() {
			fetch("http://localhost:3000/api/posts", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(this.post)
            })
			.then(response => {
				if (response.status === 401 || response.status === 403) {
					this.$router.push("/login");
					throw new Error("Unauthorized"); 
				}
				if (!response.ok) {
					alert("Failed to add post!");
				} else {
					this.$router.replace("/");
				}
			});
		}
	}
}
</script>
<style scoped>
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
</style>