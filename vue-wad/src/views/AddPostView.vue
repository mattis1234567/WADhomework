<template>
    <Header></Header>
    <div>
        <h1>This is add post view</h1>
    </div>
    <Footer></Footer>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
    name: 'AddPostView',
    components: {
        Header,
        Footer
    }
}
</script>