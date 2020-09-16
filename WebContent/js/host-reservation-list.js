Vue.component('host-reservation-list', {
	data: function (){
		return {
			apartmentsId:[],
			reservations: [],
			test:[4]
		};
	},
	mounted() {
		axios
		.get('rest/apartments/hostIds/'+app.user.id)
		.then(response=>{
			this.apartmentsId=response.data
			axios
			.post('rest/reservations/host',this.apartmentsId)
			.then(response=>{
			this.reservations=response.data
		})
		})
		
		
		
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
				<reservation-item v-on:update="update" v-for="reservation in reservations"  v-bind:key="reservation.id" :reservation="reservation" :host="true"></reservation-item>
			</div>
		`
})