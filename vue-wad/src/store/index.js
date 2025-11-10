import { createStore } from 'vuex'

export default createStore({
  state: {
    posts: []
  },
  getters: {
    getLikes: (state) => (postID) => {
      let post = state.posts.find(p => p.postID == postID);
      if (post && post.likes == undefined) {
        post.likes = 0;
      }
      return post ? post.likes : 0;
    }
  },
  mutations: {
    SetPosts: (state, posts) => {
      state.posts = posts;
    },
    IncreaseLikes: (state, postID) => {
      let post = state.posts.find(p => p.postID == postID);
      post.likes += 1;
    },
    ResetLikes: (state) => {
      state.posts.forEach(post => {
        post.likes = 0;
      });
    },
    RandomizeLikes: (state) => {
      state.posts.forEach(post => {
        post.likes = Math.floor(Math.random() * 100);
      })
    }
  },
  actions: {
    SetPostsAct: (act, posts) => {
      act.commit('SetPosts', posts);
    },
    IncreaseLikesAct: (act, postID) => {
      act.commit('IncreaseLikes', postID);
    },
    ResetLikesAct: (act) => {
      act.commit('ResetLikes');
    },
    RandomizeLikesAct: (act) => {
      act.commit('RandomizeLikes');
    }
  },
  modules: {
  }
})
