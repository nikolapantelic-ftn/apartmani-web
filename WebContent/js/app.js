const ApartmentSearch = { template: '<apartment-search></apartment-search>' }
const ApartmentDetails = { template: '<apartment-details></apartment-details>' }
const ApartmentAdd = { template: '<apartment-add></apartment-add>' }
const ApartmentControl = { template: '<apartment-control></apartment-control>' }
const Index = { template: '<index></index>' }
const AllApartments = { template: '<all-apartments></all-apartments>' }
const AllReservations = { template: '<all-reservations></all-reservations>' }
const UsersView = { template: '<users-view></users-view>' }
const HostRegistration = { template: '<host-registration></host-registration>' }
const HostApartments = { template: '<host-apartments></host-apartments>' }
const Amenities = { template: '<amenities-list></amenities-list>' }
const ReservationList = { template: '<reservation-list></reservation-list>' }
const ProfileView = { template: '<profile-view></profile-view>' }
const SimpleSearch = { template: '<simple-search></simple-search>' }
const HostReservationList = { template: '<host-reservation-list></host-reservation-list>' }
const UsersViewHost = { template: '<users-view-host></users-view-host>' }

Vue.component('star-rating', VueStarRating.default);

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		{ path: '*', component: Index },
	    { path: '/', component: Index },
		{ path: '/search', component: ApartmentSearch },
		{ path: '/apartment/:id', component: ApartmentDetails },
		{ 
			path: '/users', 
			component: UsersView,
			beforeEnter: (to, from, next) => {
				axios
					.get('rest/currentUser')
					.then(response => {
						if (response.data.role != 'Admin') next({ path: '/' });
						else next();
					})
			} 
		},
		{
			path: '/addHost',
			component: HostRegistration,
			beforeEnter: (to, from, next) => {
				axios
					.get('rest/currentUser')
					.then(response => {
						if (response.data.role != 'Admin') next({ path: '/' });
						else next();
					})
			} 
		},
		{
			path: '/amenities',
			component: Amenities,
			beforeEnter: (to, from, next) => {
				axios
					.get('rest/currentUser')
					.then(response => {
						if (response.data.role != 'Admin') next({ path: '/' });
						else next();
					})
			} 	
		},
		{
			path: '/apartment-add',
			component: ApartmentAdd,
			beforeEnter: (to, from, next) => {
				axios
					.get('rest/currentUser')
					.then(response => {
						if (response.data.role != 'Host') next({ path: '/' });
						else next();
					})
			} 
		},
		{
			path: '/apartment-control/:id',
			component: ApartmentControl,
			beforeEnter: (to, from, next) => {
				axios
					.get('rest/currentUser')
					.then(response => {
						if (response.data.role != 'Admin' && response.data.role != 'Host') next({ path: '/' });
						else next();
					})
			} 
		},
		{ 
			path: '/reservation-list',
			component: ReservationList,
			beforeEnter: (to, from, next) => {
				axios
					.get('rest/currentUser')
					.then(response => {
						if (response.data.role != 'Guest') next({ path: '/' });
						else next();
					})
			} 
		},
		{
			path: '/profile',
			component: ProfileView,
			beforeEnter: (to, from, next) => {
				axios
					.get('rest/currentUser')
					.then(response => {
						if (!response.data.role) next({ path: '/' });
						else next();
					})
			} 
		},
		{ path: '/simple-search/:s', component: SimpleSearch },
		{
			path: '/host-apartments',
			component: HostApartments,
			beforeEnter: (to, from, next) => {
				axios
					.get('rest/currentUser')
					.then(response => {
						if (response.data.role != 'Host') next({ path: '/' });
						else next();
					})
			} 
		},
		{
			path: '/host-reservations',
			component: HostReservationList,
			beforeEnter: (to, from, next) => {
				axios
					.get('rest/currentUser')
					.then(response => {
						if (response.data.role != 'Host') next({ path: '/' });
						else next();
					})
			} 
		},
		{
			path: '/host-guests',
			component: UsersViewHost,
			beforeEnter: (to, from, next) => {
				axios
					.get('rest/currentUser')
					.then(response => {
						if (response.data.role != 'Host') next({ path: '/' });
						else next();
					})
			} 
		},
		{
			path: '/all-apartments',
			component: AllApartments,
			beforeEnter: (to, from, next) => {
				axios
					.get('rest/currentUser')
					.then(response => {
						if (response.data.role != 'Admin') next({ path: '/' });
						else next();
					})
			} 
		},
		{
			path: '/all-reservations',
			component: AllReservations,
			beforeEnter: (to, from, next) => {
				axios
					.get('rest/currentUser')
					.then(response => {
						if (response.data.role != 'Admin') next({ path: '/' });
						else next();
					})
			} 
		}
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
			.then(response => (window.location.href = 'login.html'));
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
		},
		hostGuests: function () {
			router.push('/host-guests');
		},
		showAllApartments: function () {
			router.push('/all-apartments');
		},
		hostReservations: function () {
			router.push('/host-reservations');
		},
		allReservations: function () {
			router.push('/all-reservations');
		}
	}
})