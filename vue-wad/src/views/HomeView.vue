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

export default {
  name: 'HomeView',
  components: {
    Header,
    Footer,
    Post
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
