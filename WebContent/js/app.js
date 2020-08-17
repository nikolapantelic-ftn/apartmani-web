const BookingForm = { template: '<booking-form></booking-form>' }
const ApartmentSearch = { template: '<apartment-search></apartment-search>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: BookingForm},
		{ path : '/search', component: ApartmentSearch}
	  ]
});

var app = new Vue({
	router,
	el: '#app',
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
	},
	methods: {
		logout: function(e) {
			axios
			.get('rest/logout')
			.then(response => (window.location.href = '/apartmani-web'));
		}
	}
})