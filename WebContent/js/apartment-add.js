Vue.component('apartment-add', {
	data: function () {
		return {
			name: '',
			type: '',
			numberOfRooms: '',
			location: '',
			price: '',
			checkInTime: '',
			checkOutTime: '',
			amenitiyIds: [],
		}
	},
	template:
		`
			<div class="container">
				<h1>Dodavanje apartmana</h1>
				<form>
					<div class="form-group">
						<input type="text" class="form-control" id="name" placeholder="Naziv">
					</div>
					<div class="form-group">
			    		<label for="type">Tip apartmana</label>
			    		<div id="type">
			    			<div class="form-check form-check-inline">
					    		<input class="form-check-input" v-model='type' type="radio" id="full-apartment" value="fullApartment">
				                <label class="form-check-label" for="full-apartment">Ceo apartman</label>
			                </div>
			                <div class="form-check form-check-inline">
				                <input class="form-check-input" v-model='type' type="radio" id="room" value="room">
				                <label class="form-check-label" for="room">Soba</label>
			                </div>
		                </div> 	
			    	</div>
			    	<div class="form-group">
			    		<div class="input-group">
			    			<input type="text" class="form-control col-md-2" id="price" placeholder="Cena nocenja">
			    			<div class="input-group-append">
			    				<div class="input-group-text">din.</div>
			    			</div>
			    		</div>
			    	</div>
			    	<div class="form-row">
			    		<div class="col-sm-3 my-1">
			    			<select class="custom-select" id="check-in-time">
			    				<option selected disabled hidden>Vreme prijave</option>
			    			</select>
			    		</div>
			    		<div class="col-sm-3 my-1">
			    			<select class="custom-select" id="check-out-time">
			    				<option selected hidden disabled>Vreme odjave</option>
			    			</select>
			    		</div>
			    	</div>
			    	<div>
			    		SADRZAJE APARTMANA DOBAVITI PREKO SERVISA
			    	</div>
			    	<div class="form-group">
					    <label for="image-upload">Dodajte sliku</label>
					    <input type="file" class="form-control-file" id="image-upload">
					</div>
			    	<button type="submit" class="btn btn-primary">Prijavi</button>
				</form>
			</div>
		`
})