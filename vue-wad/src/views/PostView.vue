<template>
    <Header></Header>
    <form>
        <h1>Modify post</h1><br>
        <p>Created on {{ post.creation_time }}</p>
        <textarea required placeholder="What do you want to write about?" v-model="post.body" ></textarea> <br>
        <div>
            <button @click.prevent="updatePostBtn">Update</button>
            <button @click.prevent="deletePostBtn">Delete</button>
        </div>
    </form>
    <Footer></Footer>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
    name: 'PostView',
    components: { Header, Footer },
    data() {
        return { post: {} };
    },
    async mounted() {
        const id = this.$route.params.id;
        fetch('http://localhost:3000/api/posts/' + id, {
            credentials: 'include'
        })
        .then(response => {
            if (response.status === 401 || response.status === 403) {
                this.$router.push("/login");
                throw new Error("Unauthorized"); 
            }
            if (!response.ok) {
                throw new Error("Server Error");
            }
            return response.json();
        })
        .then(json => { this.post = json; })
        .catch(err => console.log(err));
    },
    methods: {
        updatePostBtn: function() {
            fetch("http://localhost:3000/api/posts/" + this.post.id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ body: this.post.body })
            }).then(response => {
                if (!response.ok) alert("Failed to update!");
                else this.$router.replace("/");
            });
        },
        deletePostBtn: function() {
            fetch("http://localhost:3000/api/posts/" + this.post.id, {
                method: 'DELETE',
                credentials: 'include'
            }).then(response => {
                if (!response.ok) alert("Failed to delete!");
                else this.$router.replace("/");
            });
        }
    },
}
</script>
<style scoped>
form {
    margin: 1em;
    padding: 1em;
    background-color: var(--background-color);
    border-radius: 20px;
}

form textarea {
    width: 100%;
    height: 25vh;
    padding: 1em;
    resize: none;
}

button {
  margin-top: 1em;
  margin-right: 1em;
  background-color: var(--primary-color);
  border: none;
  padding: 1em;
  border-radius: 8px;
  font-size: 22px;
  box-shadow: var(--uniform-shadow);
}

button:hover {
  background-color: var(--primary-color-hover);
}

h1, p {
    margin: 0em;
}

</style>