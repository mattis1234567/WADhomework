export default {
    authenticated: async function() {
        try {
            const response = await fetch("http://localhost:3000/auth/authenticate", {
                credentials: 'include' 
            });
            const data = await response.json();
            return data.authenticated;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}