<template>
  <Header></Header>
  <main>
    <div id="posts" >
      <Post v-for="(post, id) in posts" :key="id" :post_datetime="post.creationTime" :post_body="post.body" :post_image_url="post.imageUrl" ></Post>
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
  data: function() {
    return {
      posts: postsData.map(post => ({
        ...post,
        imageUrl: post.imageUrl ? (post.imageUrl.startsWith("./") ? require(`@/assets/${post.imageUrl.substring(2)}`) : post.imageUrl) : null
      }))
    };
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
</style>
