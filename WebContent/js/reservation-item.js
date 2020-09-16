Vue.component('reservation-item', {
	props: {
		reservation: Object,
		host:''
	},
	data: function () {
		return {
			apartment: null,
			checkInTime: '',
			checkOutTime: '',
		};
	},
	methods: {
		cancel: function () {
			axios.delete('rest/reservations/' + this.reservation.id)
			.then(this.$emit('update'))
			.catch(error => (console.log(error.response.data)));
		},
		checkIn: function () {
			let date = new Date(this.reservation.startDate);
			this.checkInTime = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + 
				'. u ' + this.apartment.checkInTime;
		},
		checkOut: function () {
			let date = new Date(this.reservation.startDate);
			date.setDate(date.getDate() + parseInt(this.reservation.nightsNumber));
			this.checkOutTime = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + 
				'. u ' + this.apartment.checkOutTime;
		},
		acceptReservation:function(){
			this.reservation.status='accepted';
			axios
			.post('rest/reservations/updateStatus', this.reservation)
				.then(function () {
					alert("Rezervacija prihvacena");
				})
				.catch(error => {
					alert(error.response.data);
				})
		},
		declineReservation:function(){
			this.reservation.status='rejected';
			axios
			.post('rest/reservations/updateStatus', this.reservation)
				.then(function () {
					alert("Rezervacija prihvacena");
				})
				.catch(error => {
					alert(error.response.data);
				})
		}
	},
	mounted() {
		axios
			.get('rest/apartments/search/' + this.reservation.apartment)
			.then(response => {
				this.apartment = response.data;
				this.checkIn();
				this.checkOut();
			});
	},
	template:
		`
			<div class="row border border-info rounded py-2 my-1" v-if="apartment">
				<div class="col-sm-4">
					<h3>{{ apartment.name }}</h3>
					<div>
						<h5 style="display: inline;">{{ apartment.location.address.place}} </h5>
						<h6 style="display: inline;" class="text-muted"> {{ apartment.location.address.zipCode }}</h6>
					</div>
					{{ apartment.location.address.streetAndNumber }}
				</div>
				<div class="col">
					<div class="float-right">
						Vreme prijave: {{ checkInTime }}
					</div><br>
					<div class="float-right">
						Vreme odjave: {{ checkOutTime }}
					</div><br>
					<div class="float-right">
						Broj nocenja: {{ reservation.nightsNumber }}
					</div><br>
					<div class="float-right">
						Cena: {{ reservation.totalPrice }} din.
					</div>
				</div>
				<div class="w-100"></div>
				<div class="col-md-3">
					<img v-bind:src="apartment.images[0]" alt="No image" style="width: 100%" v-if="apartment.images">
					<img src="resources/images/0.jpg" alt="No image" style="width: 100%" v-else>
				</div>
				<div class="col mr-2">
					<div class="float-right">
						<h5 class="d-inline">Status:</h5>
						<h4 class="d-inline text-info" v-if="reservation.status == 'created'">Na cekanju</h4>
						<h4 class="d-inline text-success" v-else-if="reservation.status == 'accepted'">Prihvacena</h4>
						<h4 class="d-inline text-danger" v-else-if="reservation.status == 'rejected'">Odbijena</h4>
					</div>
					<button type="button" class="btn btn-success float-right sticky-bottom" v-if="reservation.status == 'created' && host" v-on:click="acceptReservation">Prihvati</button>
					<button type="button" class="btn btn-danger float-right sticky-bottom" v-if="(reservation.status == 'created'|| reservation.status == 'accepted')&&host" v-on:click="declineReservation">Odbij</button>
					<button @click="cancel" class="btn btn-danger float-right sticky-bottom" v-if="(reservation.status == 'created' || reservation.status == 'accepted')&& !host" style="position: absolute; right: 0; bottom: 0;">
						Otkazi
					</button>
				</div>
				
			</div>
		`
})