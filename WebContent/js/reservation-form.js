Vue.component("reservation-form", {
	props: ['apartment'],
	data: function() {
		return {
			startDate: '',
			endDate: '',
			nightsNumber: '',
			totalPrice: '',
			message: '',
			guestsNumber: ''
		}
	},
	mounted () {
		
	},
	methods: {
		updateNightsNumber: function () {
			if (this.endDate && this.startDate) {
				this.nightsNumber = (Date.parse(this.endDate) - Date.parse(this.startDate)) / (1000*60*60*24);
			}
		},
		submitReservation: function () {
			data = {
				id: '0',
				apartment: this.apartment.id,
				startDate: Date.parse(this.startDate),
				nightsNumber: this.nightsNumber,
				totalPrice: this.totalPrice,
				message: this.message,
				guest: app.user.id,
				status: 'created',
				deleted: 'false'
			}
			axios
				.post('rest/reservations', data)
				.then(function () {
					alert("Rezervacija uspesna");
				})
				.catch(error => {
					alert(error.response.data);
				})
				
		}
	},
	template:
		`
			<transition name="modal">
		    	<div class="modal-mask">
					<div class="modal-wrapper">
						<div class="modal-container">
		
							<div class="modal-header">
								<slot name="header">
									<h6>Rezervacija apartmana <h4>{{apartment.name}}</h4></h6>
								</slot>
							</div>
		
							<div class="modal-body">
								<div class="row">
									<div class="col-4">
		                             	<h5 class="title text-center">Datum prijave</h5>
										<div class="mt-1">
											<input class="form-control" type="date" v-model="startDate" @change="updateNightsNumber">
										</div>
									</div>
									<div class="col-4">
		                             	<h5 class="title text-center">Datum odjave</h5>
										<div class="mt-1">
											<input class="form-control" type="date" v-model="endDate" @change="updateNightsNumber">
										</div>
									</div>
									<div class="col-3">
		                             	<h5 class="title text-center">Broj gostiju</h5>
										<div class="mt-1">
											<select class="custom-select" v-model="guestsNumber">
												<option selected value="1">1</option>
											</select>
										</div>
									</div>
								</div>
								<div class="ml-3">
									<div class="row my-1">
										Vreme prijave:
									</div>
									<div class="row my-1">
										Vreme odjave:
									</div>
									<div class="row my-1">
										Broj nocenja: {{nightsNumber}}
									</div>
									<div class="row my-1">
										Ukupna cena:
									</div>
									<div class="row my-1">
										<button class="btn btn-info">Proveri dostupnost</button>
									</div>
								</div>
							</div>
		
							<div class="modal-footer">
								<slot name="footer">
									<button class="btn btn-secondary modal-default-button" @click="$emit('close')">
										Odustani
									</button>
									<button class="btn btn-success modal-default-button" @click="submitReservation(); $emit('close');">
										Rezervisi
									</button>
								</slot>
							</div>
						</div>
					</div>
		        </div>S
			</transition>
		`
})