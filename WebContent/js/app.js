var app = new Vue({
	el: '#navbar',
	data: {
		user: null,
		isLoggedIn: false,
		searchField: ""
	},
	mounted () {
		axios
			.get('rest/currentUser')
			.then(function (response) {
				app.user = response.data;
				if (app.user) {
					app.isLoggedIn = true;
				}
			});
	}
})