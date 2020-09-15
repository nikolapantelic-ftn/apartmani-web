Vue.component("reservation-form", {
	props: {
		apartment: Object,
		minDate:'',
		maxDate:'',
		disabledDates:''
	},
	data: function() {
		return {
			startDate: '',
			nightsNumber: '',
			message: '',
			guestsNumber: '1',
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
	computed:{
		checkIn(){
			let date = new Date(this.startDate);
			return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
				+ '. u ' + this.apartment.checkInTime;
		
		},
		checkOut(){
			var nights=parseInt(this.nightsNumber)
			let date = new Date(this.startDate);
			date.setDate(date.getDate()+nights)
			return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
				+ '. u ' + this.apartment.checkOutTime;
		},
		totalPrice(){
			var nights=parseInt(this.nightsNumber)
			return nights*this.apartment.price
		}
	},
	methods: {	
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
			axios
				.get('rest/reservations/apartment/' + this.apartment.id + '/free-dates')
				.then(response => (console.log(response.data)));
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
											<vue-ctk-date-time-picker label="Prijava" v-model="startDate" :only-date="true"  v-bind:disabled-dates="disabledDates" v-bind:min-date="minDate" v-bind:max-date="maxDate"  :no-shortcuts ="true">
          									</vue-ctk-date-time-picker>
										</div>
									</div>
									<div class="col-4">
		                             	<h5 class="title text-center">Broj noci</h5>
										<div class="mt-1">
											<input class="form-control" type="text" v-model="nightsNumber"> </input>
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
									<div class="row my-1" v-if="startDate && nightsNumber">
										Vreme odjave: {{ checkOut }}
									</div>
									<div class="row my-1" v-if="nightsNumber">
										Broj nocenja: {{ nightsNumber }}
									</div>
									<div class="row my-1" v-if="totalPrice">
										Ukupna cena: {{ totalPrice }} din.
									</div>
									<div class="row my-1" v-if="startDate && nightsNumber">
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