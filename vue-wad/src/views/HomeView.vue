<template>
  <Header></Header>
  <main>
    <div id="posts" >
      <Post v-for="post in posts" :key="post.postID" :post_id="post.postID" :post_datetime="post.creationTime" :post_body="post.body" :post_image_url="post.imageUrl" ></Post>
    </div>
    <div>
      <button @click="resetLikesBtn">Reset likes</button>
      <button @click="randomizeLikesBtn">Randomize Likes</button>
    </div>
  </main>
  <Footer></Footer>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Post from '@/components/Post.vue';
import postsData from '@/assets/posts.json';

export default {
  name: 'HomeView',
  components: {
    Header,
    Footer,
    Post
  },
  mounted() {
    let posts = postsData.map(post => ({
        ...post,
        imageUrl: post.imageUrl ? (post.imageUrl.startsWith("./") ? require(`@/assets/${post.imageUrl.substring(2)}`) : post.imageUrl) : null
      }));
    this.$store.dispatch('SetPostsAct', posts);
  },
  data: function() {
    return {};
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    }
  },
  methods: {
    resetLikesBtn: function() {
      this.$store.dispatch('ResetLikesAct');
    },
    randomizeLikesBtn: function() {
      this.$store.dispatch('RandomizeLikesAct');
    }
  }
}
</script>
<style>
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
  border-radius: 15%;
  font-size: 22px;
	box-shadow: var(--uniform-shadow);
}

button:hover {
  background-color: var(--primary-color-hover);
}

</style>
