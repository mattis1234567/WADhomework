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
      fetch("http://localhost:3000/api/posts", {
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
      .then(json => {
        if (Array.isArray(json)) {
          this.posts = json;
          this.posts.sort((a, b) => new Date(b.creation_time) - new Date(a.creation_time));
        } else {
          console.error("Expected an array of posts, but got:", json);
        }
      })
      .catch(err => {
        console.warn("Fetch error:", err.message); 
      });
    },
    deleteAllPostsBtn: function() {
      fetch("http://localhost:3000/api/posts/", {
          method: 'DELETE',
          credentials: 'include'
      }).then(response => {
          if (!response.ok) {
              alert("Failed to delete posts!");
          }
          this.loadPosts();
      });
    },
    gotoPostViewBtn: function(id) {
      this.$router.push({name: 'PostView', params: {id}});
    }
  },
  mounted() {
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
