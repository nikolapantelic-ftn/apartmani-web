Vue.component('reservation-list', {
	data: function (){
		return {
			reservations: [],
		};
	},
	mounted() {
		axios
			.get('rest/reservations/guest/' + app.user.id)
			.then(response => (this.reservations = response.data));
	},
	methods: {
		update: function() {
			axios
				.get('rest/reservations/guest/' + app.user.id)
				.then(response => (this.reservations = response.data));
		}
	},
	template:
		`
			<div class="container">
				<reservation-item v-on:update="update" v-for="reservation in reservations" v-bind:key="reservation.id" :reservation="reservation" v-if="reservation.status != 'finished' && reservation.status != 'canceled'"></reservation-item>
			</div>
		`
})