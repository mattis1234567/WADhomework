<template>
    <Header></Header>
    <main>
        <div class="contactInfo">
            <div class="info">
                <img class="icon-button" src="@/assets/telephone-icon.png">
                <p>+372 1234 5678</p>
            </div>
            <div class="info">
                <img class="icon-button" src="@/assets/mail-icon.png">
                <p>email.address@email.com</p>
            </div>
            <div class="info">
                <img class="icon-button" src="@/assets/address-icon.png">
                <p>Estonia, Tartumaa, Tartu Linn</p>
            </div>
        </div>
    </main>
    <Footer></Footer>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
    name: 'ContactUs',
    components: {
        Header,
        Footer
    },
    methods: {}
};
</script>
<style scoped>
.contactInfo {
	width: 100%;
	padding: 1em;
	margin: 1em 0;
	background-color: var(--background-color);
	border-radius: 10px;
} 

.contactInfo textarea {
    width: 100%;
    height: 25vh;
    padding: 1em;
    resize: none;
}

.contactInfo a {
	color: teal;
}

.icon-button {
    width: 40px;
    height: 40px;
    margin-right: 1em;
}

.info {
    display: flex;
    flex-direction: row;
    justify-content: left;
    margin: 0 0.5em 0 0.5em;
}
</style>