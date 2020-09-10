Vue.component("reservation-form", {
	data: function() {
		return {
			apartment: null
		}
	},
	
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
									TODO Rezervacija apartmana
								</slot>
							</div>
		
							<div class="modal-body">
								<header class="card-header">
									<a href="#" data-toggle="collapse" data-target="#collapse_aside1" data-abc="true" aria-expanded="false" class="collapsed">
										<i class="icon-control fa fa-chevron-down"></i>
	                             		<h6 class="title">Datum prijave </h6>
									</a> 
								</header>
								<div class="filter-content collapse show" id="collapse_aside1">
									<div class="card-body">
										<input class="form-control" type="date"  v-model="startDate">
									</div>
								</div>
							</div>
		
							<div class="modal-footer">
								<slot name="footer">
									<button class="btn btn-primary modal-default-button" @click="$emit('close')">
										OK
									</button>
								</slot>
							</div>
						</div>
					</div>
		        </div>S
			</transition>
		`
})