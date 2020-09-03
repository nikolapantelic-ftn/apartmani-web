const ApartmentSearch = { template: '<apartment-search></apartment-search>' }
const ApartmentDetails = { template: '<apartment-details></apartment-details>' }
const Index = { template: '<index></index>'}
const UsersView = { template: '<users-view></users-view>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: Index},
		{ path : '/search', component: ApartmentSearch},
		{ path : '/apartment/:id', component: ApartmentDetails},
		{ path: '/users', component: UsersView }
	  ]
});

var app = new Vue({
	router,
	el: '#app',
	data: {
		user: null,
		isLoggedIn: false,
		searchField: "",
		apartments: []
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
	},
	methods: {
		logout: function(e) {
			axios
			.get('rest/logout')
			.then(response => (window.location.href = '/apartmani-web'));
		}
	}
})