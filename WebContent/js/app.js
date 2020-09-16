const ApartmentSearch = { template: '<apartment-search></apartment-search>' }
const ApartmentDetails = { template: '<apartment-details></apartment-details>' }
const ApartmentAdd = { template: '<apartment-add></apartment-add>' }
const ApartmentControl = { template: '<apartment-control></apartment-control>' }
const Index = { template: '<index></index>' }
const UsersView = { template: '<users-view></users-view>' }
const HostRegistration = { template: '<host-registration></host-registration>' }
const HostApartments = { template: '<host-apartments></host-apartments>' }
const Amenities = { template: '<amenities-list></amenities-list>' }
const ReservationList = { template: '<reservation-list></reservation-list>' }
const ProfileView = { template: '<profile-view></profile-view>' }
const SimpleSearch = { template: '<simple-search></simple-search>' }
const HostReservationList = { template: '<host-reservation-list></host-reservation-list>' }


Vue.component('star-rating', VueStarRating.default);


const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		{ path: '*', component: Index },
	    { path: '/', component: Index },
		{ path: '/search', component: ApartmentSearch },
		{ path: '/apartment/:id', component: ApartmentDetails },
		{ path: '/users', component: UsersView },
		{ path: '/addHost',component: HostRegistration },
		{ path: '/amenities',component: Amenities },
		{ path: '/apartment-add', component: ApartmentAdd },
		{ path: '/apartment-control/:id', component: ApartmentControl },
		{ path: '/reservation-list', component: ReservationList},
		{ path: '/profile', component: ProfileView },
		{ path: '/simple-search/:s', component: SimpleSearch },
		{ path: '/host-apartments', component: HostApartments },
		{ path: '/host-reservations', component: HostReservationList },
	  ]
});
router.replace('/');


var app = new Vue({
	router,
	el: '#app',
	data: {
		user: null,
		isLoggedIn: false,
		searchField: '',
		apartments: []
	},
	mounted () {
		axios
			.get('rest/currentUser')
			.then(function (response) {
				app.user = response.data;
				currentUser = response.data;
				
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
		},
		addApartment: function () {
			router.push('/apartment-add');
		},
		home: function () {
			router.push('/');
		},
		reservationList: function () {
			router.push('/reservation-list');
		},
		profileView: function () {
			router.push('/profile');
		},
		search: function () {
			router.push('/simple-search/' + this.searchField);
		},
		hostApartments: function () {
			router.push('/host-apartments');
		}
	}
})