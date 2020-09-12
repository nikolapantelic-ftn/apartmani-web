Vue.component("reservation-form", {
	props: {
		apartment: Object
	},
	data: function() {
		return {
			startDate: '',
			endDate: '',
			nightsNumber: '',
			totalPrice: '',
			message: '',
			guestsNumber: '1',
			checkIn: '',
			checkOut: '',
			available: ''
		}
	},
	beforeMount(){
		axios
			.post('rest/users/isGuest')
			.catch(e=>{
				if(e.response.status==403) {
					window.location.href = "403.html";
			}
		});
	},
	methods: {
		updateNightsNumber: function () {
			if (this.endDate && this.startDate) {
				this.nightsNumber = (Date.parse(this.endDate) - Date.parse(this.startDate)) / (1000*60*60*24);
			}
			if (this.apartment.price != '') {
				this.totalPrice = this.nightsNumber * this.apartment.price;
			}
		},
		updateCheckIn: function () {
			let date = new Date(this.startDate);
			let tommorow = new Date();
			tommorow = tommorow.setDate(tommorow.getDate() + 1);
			if (date < tommorow || date >= new Date(this.endDate)) {
				this.startDate = '';
				return;
			}
			this.checkIn = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
				+ '. u ' + this.apartment.checkInTime;
			this.updateNightsNumber();
		},
		updateCheckOut: function () {
			let date = new Date(this.endDate);
			if (date <= new Date(this.startDate)) {
				this.endDate = '';
				return;
			}
			this.checkOut = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
				+ '. u ' + this.apartment.checkOutTime;
			this.updateNightsNumber();
		},
		checkAvailability: function () {
			axios
				.post('rest/reservations/available', {
					apartment: this.apartment.id,
					startDate: this.startDate,
					nightsNumber: this.nightsNumber
				})
				.then(response => {
					if (response.data == true) {
						this.available = true;
					} else {
						this.available = false;
					}
				})
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
								<div class="row d-flex justify-content-between">
									<div class="col-4">
		                             	<h5 class="title text-center">Datum prijave</h5>
										<div class="mt-1">
											<input class="form-control" type="date" v-model="startDate" @change="updateCheckIn">
										</div>
									</div>
									<div class="col-4">
		                             	<h5 class="title text-center">Datum odjave</h5>
										<div class="mt-1">
											<input class="form-control" type="date" v-model="endDate" @change="updateCheckOut">
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
								<div class="my-2">
									<textarea class="form-control" id="messagebox" rows="2" placeholder="Poruka"></textarea>
								</div>
								<div class="ml-3">
									<div class="row my-1" v-show="startDate">
										Vreme prijave: {{ checkIn }}
									</div>
									<div class="row my-1" v-if="endDate">
										Vreme odjave: {{ checkOut }}
									</div>
									<div class="row my-1" v-if="nightsNumber">
										Broj nocenja: {{ nightsNumber }}
									</div>
									<div class="row my-1" v-if="totalPrice">
										Ukupna cena: {{ totalPrice }} din.
									</div>
									<div class="row my-1" v-if="startDate && endDate">
										<button class="btn btn-info" @click="checkAvailability">Proveri dostupnost</button>
									</div>
								</div>
								<h4 class="text-success text-center" v-if="available === true">Dostupno.</h4>
								<h4 class="text-danger text-center" v-if="available === false">Nije dostupno.</h4>
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