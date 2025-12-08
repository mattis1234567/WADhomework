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
import { isAuthenticated } from '@/auth';

export default {
    name: 'PostView',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            post: {}
        };
    },
    mounted() {
        if (!isAuthenticated()) {
            this.$router.push({name: 'Log in'});
        }
        const id = this.$route.params.id;
        fetch('http://localhost:3000/api/posts/' + id).then(response => response.json()).then(json => {
            console.log(json);
            this.post = json;
        });
    },
    methods: {
        updatePostBtn: function() {
            fetch("http://localhost:3000/api/posts/" + this.post.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.post)
            }).then(response => {
                if (!response.ok) {
                    alert("Failed to modify post!");
                }
                this.$router.replace({name: 'home'});
            });
        },
        deletePostBtn: function() {
            fetch("http://localhost:3000/api/posts/" + this.post.id, {
                method: 'DELETE'
            }).then(response => {
                if (!response.ok) {
                    alert("Failed to delete post!");
                }
                this.$router.replace({name: 'home'});
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