<template>
	<header>
		<nav class="nav">
            <router-link class="nav-link" to="/"><strong>Home</strong></router-link>
            <router-link class="nav-link" to="/addpost"><strong>Add Post</strong></router-link>
			<router-link class="nav-link" to="/ContactUs"><strong>Contact Us</strong></router-link>
		</nav>
		<div class="dropdown" :class="{open: isOpen}" ref="dropdown">
			<img src="@/assets/me.png" width="55px" height="55px" alt="Open menu" @click="toggleDropdown">
			<div class="dropdown-content" v-if="isOpen">
				<a role="menuitem">John Doe</a>
				<a role="menuitem">john.doe@ut.ee</a>
				<a role="menuitem" @click="logOutBtn" class="button">Logout</a>
			</div>
		</div>
	</header>
</template>
<script>
import { logOut } from '@/auth';

export default {
    name: 'Header',
	data: function() {
		return {
			isOpen: false
		};
	},
	methods: {
		toggleDropdown() {
			this.isOpen = !this.isOpen;
		},
		logOutBtn() {
			logOut();
		},
		handleClickOutside(event) {
			if (this.isOpen && this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
				this.isOpen = false;
			}
		}
	},
	mounted() {
		document.addEventListener('click', this.handleClickOutside);
	},
	beforeUnmount() {
		// Remove listener to avoid memory leaks
		document.removeEventListener('click', this.handleClickOutside);
	}
}
</script>
<style scoped>
header {
	position: sticky;
	top: 0;
	z-index: 1000;
	display: flex;
	align-items: center;
	background-color: var(--primary-color);
	border-radius: 20px;
	border: none;
	padding: 1em;
	box-shadow: var(--uniform-shadow);
}

.nav {
	display: flex;
	flex-direction: row;
	gap: 1em;
}

.nav-link {
	text-decoration: none;
	padding: 10px 15px;
	text-align: left;
	color: black;
	border-radius: 20px;
	transition: background-color 0.2s linear;
}

.nav-link ~ .nav-link {
	margin-left: 1em;
}

.nav-link:hover {
	background-color: var(--primary-color-hover);
}


.dropdown {
	margin-left: auto;
	margin-right: 0
}

.dropdown img {
	border-radius: 50%;
	margin-left: auto;
	margin-right: 0
}

.dropdown-content {
	right: 0;
	left: auto;
	display: block;
	position: absolute;
	z-index: 1;
	background: var(--primary-color-darkened);
	border-radius: 10px;
	visibility: hidden;
	transform: translateY(5px);
	pointer-events: none;
	transition: 0.3s;
}

.dropdown-content a {
	display: block;
	padding: 10px;
	color: black;
	border-radius: 10px;
	transition: 0.3s;
}

.dropdown.open .dropdown-content {
	visibility: visible;
	transform: translateY(0);
	pointer-events: auto;
}

.dropdown-content a:hover {
	background-color: var(--primary-color-hover);
}

.button {
	cursor: pointer;
}

</style>