var app = new Vue({
	el: '#navbar',
	data: {
		user: null,
		isLoggedIn: false,
		searchField: ""
	},
	mounted () {
		console.log("asd");
		axios
			.get('rest/currentuser')
			.then(function (response) {
				this.user = response.data;
				console.log("asd");
				if (this.user) {
					isLoggedIn = true;
					console.log(user);
				}
			});
	}
})