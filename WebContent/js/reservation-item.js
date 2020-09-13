Vue.component('reservation-item', {
	props: {
		reservation: Object
	},
	data: function () {
		return {
			apartment: null
		};
	},
	methods: {
		click(id) {
			//router.push('/reservation/' + id)
		},
		cancel: function () {
			axios.delete('rest/reservations/' + this.reservation.id)
			.then(this.$emit('update'))
			.catch(error => (console.log(error.response.data)));
		}
	},
	mounted() {
		axios
			.get('rest/apartments/search/' + this.reservation.apartment)
			.then(response => (this.apartment = response.data));
	},
	template:
		`
			<div style="cursor: pointer;" class="row border border-info rounded py-2 my-1" v-if="apartment">
				<div class="col-sm-4">
					<h3>{{ apartment.name }}</h3>
					<h6 v-if="apartment.location">{{ apartment.locaiton.address.place}} </h6>
					<div><h5 style="display: inline;">Novi Sad </h5><h6 style="display: inline;" class="text-muted">21000</h6></div>
				</div>
				<div class="col">
					<div class="float-right">
						Vreme prijave:
					</div><br>
					<div class="float-right">
						Vreme odjave:
					</div><br>
					<div class="float-right">
						Broj nocenja:
					</div><br>
					<div class="float-right">
						Cena:
					</div>
				</div>
				<div class="w-100"></div>
				<div class="col-md-3">
					<img v-bind:src="apartment.images[0]" alt="No image" style="width: 100%" v-if="apartment.images">
					<img src="resources/images/0.jpg" alt="No image" style="width: 100%" v-else>
				</div>
				<div class="col mr-2">
					<button @click="cancel" class="btn btn-danger float-right sticky-bottom" style="position: absolute; right: 0; bottom: 0;">
						Otkazi
					</button>
				</div>
				
			</div>
		`
})