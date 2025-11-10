<template>
    <div class="post">
        <div class="post-header">
            <img class="post-logo" src="@/assets/me.png" alt="avatar">
            <span class="post-date">{{ post_datetime }}</span>
        </div>
        <div class="post-content">
            <img v-if="post_image_url" :src="post_image_url" alt="Post image" class="post-image">
            <p>{{ post_body }}</p>
        </div>
        <div class="social-media">
          <img class="like-button" src="@/assets/icon-like.png" alt="Like btn" @click="likeButtonClick">
          <p>{{ likes }} Likes</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Post',
    props: {
        post_datetime: {type: String, required: true},
        post_body: {type: String, required: true},
        post_image_url: {type: String, required: false},
        post_id: {type: Number, required: true}
    },
    methods: {
      likeButtonClick() {
        this.$store.dispatch('IncreaseLikesAct', this.post_id);
      }
    },
    computed: {
      likes() {
        return this.$store.getters.getLikes(this.post_id);
      }
    }
}
</script>
<style>
.post {
	display: flex;
	flex-direction: column;
	background-color: var(--background-color);
	border-style: none;
	border-radius: 20px;
	padding: 1em;
	text-align: left;
}

.post-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.post-date {
  font-size: 1em;
  color: black;
}

.post-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .1em;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post .post-content p  {
	color: black;
}

.post-image,
.post .post-content img {
	padding: 0.5em;
	margin: 0.5em;
	display: block;
	width: 90%;
	max-width: 90%;
	height: auto;
	border-radius: clamp(8px, 4vw, 20px);
}

.like-button {
  width: 40px;
  height: 40px;
}

.social-media {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0.5em 0 0.5em;
}
</style>