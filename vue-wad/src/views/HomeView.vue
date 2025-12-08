<template>
  <Header></Header>
  <main>
    <div id="posts" >
      <Post v-for="post in posts" :key="post.id" :post="post" @click.prevent="gotoPostViewBtn(post.id)" ></Post>
    </div>
    <div>
      <button @click="deleteAllPostsBtn">Delete all posts</button>
    </div>
  </main>
  <Footer></Footer>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Post from '@/components/Post.vue';

import { isAuthenticated } from '@/auth';

export default {
  name: 'HomeView',
  components: {
    Header,
    Footer,
    Post
  },
  data() {
    return {
      posts: []
    };
  },
  methods: {
    loadPosts: function() {
      fetch("http://localhost:3000/api/posts").then(response => response.json()).then(json => {
        this.posts = json;
        this.posts.sort((a, b) => {
            if (a.creation_time < b.creation_time) return -1;
            if (a.creation_time > b.creation_time) return 1;

            // If dates are equal, compare ids
            return a.id - b.id;
        });
      });
    },
    deleteAllPostsBtn: function() {
      fetch("http://localhost:3000/api/posts/", {
          method: 'DELETE'
      }).then(response => {
          if (!response.ok) {
              alert("Failed to add post!");
          }
          this.loadPosts();
      });
    },
    gotoPostViewBtn: function(id) {
      this.$router.push({name: 'PostView', params: {id}});
    }
  },
  mounted() {
    if (!isAuthenticated()) {
      this.$router.push({name: 'Log in'});
    }
    this.loadPosts();
  }
}
</script>
<style scoped>
#posts {
	display: flex;
	flex-direction: column;
	gap: 1em;
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

</style>
