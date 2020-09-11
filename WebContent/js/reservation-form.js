Vue.component("reservation-form", {
	props: ['apartment'],
	mounted () {
		
	},
	template:
		`
			<transition name="modal">
		    	<div class="modal-mask">
					<div class="modal-wrapper">
						<div class="modal-container">
		
							<div class="modal-header">
								<slot name="header">
									<h6>Rezervacija apartmana <h4>{{apartment.name}}</h5></h6>
								</slot>
							</div>
		
							<div class="modal-body">
								<div class="row">
									<div class="col-4">
		                             	<h5 class="title text-center">Datum prijave</h6>
										<div class="mt-1">
											<input class="form-control" type="date">
										</div>
									</div>
									<div class="col-4">
		                             	<h5 class="title text-center">Datum odjave</h6>
										<div class="mt-1">
											<input class="form-control" type="date">
										</div>
									</div>
									<div class="col-3">
		                             	<h5 class="title text-center">Broj gostiju</h6>
										<div class="mt-1">
											<select class="custom-select">
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
										Broj nocenja:
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
									<button class="btn btn-success modal-default-button" @click="$emit('close')">
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