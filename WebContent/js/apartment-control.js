Vue.component('apartment-control', {
	data: function () {
		return {
			apartment: null,
			id:this.$route.params.id,
			editMode: false,
			availableAmenities: [],
			selectedImage: '',
			imageErrors: []
		};
	},
	mounted: function () {
		axios
			.get('rest/amenities/active')
			.then(response => {
				this.availableAmenities = response.data;
			});
		axios
			.get('rest/apartments/search/' + this.id)
			.then(response => (this.apartment = response.data));
	},
	methods: {
		submit() {
			axios
				.put('rest/apartments', this.apartment)
				.then(response => {
					alert(Izmene sacuvane.);
				})
				.catch(e => {
					console.log(e.response.data);
				})
			this.editMode = false;
		},
		cancel() {
			axios
			.get('rest/apartments/search/' + this.id)
			.then(response => (this.apartment = response.data));
			this.editMode = false;
		},
		deleteImage(image) {
			this.apartment.images = this.apartment.images.filter(i => i !== image);
		},
		setMainImage(image) {
			this.apartment.images = this.apartment.images.filter(i => i !== image);
			this.apartment.images.unshift(image);
		},
		handleImageUpload() {
			this.selectedImage = this.$refs.image.files[0];
		},
		submitImage() {
			this.imageErrors = [];
			if (!this.selectedImage) {
				this.imageErrors.push("Morate izabrati sliku.");
				return;
			}
			let ext = this.selectedImage.name.split('.').pop().toLowerCase();
			if (ext !== 'jpg' && ext !== 'png') {
				this.imageErrors.push("Format slike nije podrzan.");
				return;
			}
			axios
				.post('rest/images/' + ext,
				this.selectedImage,
				{
					headers: {
						'Content-Type': 'application/octet-stream'
					}
				})
				.then(response => {
					this.apartment.images.push(response.data);
					alert("Slika poslata.");
				})
				.catch(function () {
					alert("Slika nije poslata.");
				});
		}
	},
	template:
		`
			<div class="container" v-if="apartment">
				<h2>{{ apartment.name }}</h2>
				<h4 class="rounded bg-secondary text-light p-2">Kontrolni panel</h4>
				<div>
					<h5>Dodavanje radnih dana</h5>
				</div>
				<div>
					<h5 class="d-inline">Izmena apartmana</h5>
					<button class="btn btn-info my-2" @click="editMode = true">Izmeni</button>
					<div>
						<div class="form-group">
							<input id="name" type="text" class="form-control" v-model="apartment.name" :disabled="editMode == false">
							<label for="name">Naziv:</label>
						</div>
						<div class="form-group">
				    		<label for="type">Tip apartmana:</label>
				    		<div id="type">
				    			<div class="form-check form-check-inline">
						    		<input class="form-check-input" v-model='apartment.type' type="radio" id="full-apartment" value="fullApartment" :disabled="editMode == false">
					                <label class="form-check-label" for="full-apartment">Ceo apartman</label>
				                </div>
				                <div class="form-check form-check-inline">
					                <input class="form-check-input" v-model='apartment.type' type="radio" id="room" value="room" :disabled="editMode == false">
					                <label class="form-check-label" for="room">Soba</label>
				                </div>
			                </div> 	
				    	</div>
						<div class="form-group">
							<label for="price">Cena nocenja:</label>
				    		<div class="input-group">
				    			<input id="price" type="text" class="form-control col-md-2" v-model="apartment.price" :disabled="editMode == false">
				    			<div class="input-group-append">
				    				<div class="input-group-text">din.</div>
				    			</div>
				    		</div>
				    	</div>
						<div class="form-group">
							<label for="number-of-rooms">Broj soba:</label>
							<input id="number-of-rooms" type="text" class="form-control col-md-2" v-model="apartment.numberOfRooms" :disabled="editMode == false">
						</div>
						<div class="form-group">
							<label for="number-of-guests">Broj gostiju</label>
							<input id="number-of-guests" type="text" class="form-control col-md-2" v-model="apartment.numberOfGuests" :disabled="editMode == false">
						</div>
						<div class="form-row">
				    		<div class="col-sm-3">
								<label for="check-in-time">Vreme prijave</label>
				    			<select class="custom-select" id="check-in-time" v-model="apartment.checkInTime" :disabled="editMode == false">
									<option value="14:00">14:00</option>
				    			</select>
				    		</div>
				    		<div class="col-sm-3">
								<label for="check-out-time">Vreme odjave</label>
				    			<select class="custom-select" id="check-out-time" v-model="apartment.checkOutTime" :disabled="editMode == false">
									<option value="10:00">10:00</option>
				    			</select>
				    		</div>
				    	</div>
						<div class="form-row">
							<div class="col-sm-3 my-3">
								<input type="text" class="form-control" v-model="apartment.location.address.zipCode" placeholder="Postanski broj" :disabled="editMode == false">
							</div>
							<div class="col-sm-3 my-3">
								<input type="text" class="form-control" v-model="apartment.location.address.place" placeholder="Mesto" :disabled="editMode == false">
							</div>
							<div class="col-sm-5 my-3">
								<input type="text" class="form-control" v-model="apartment.location.address.streetAndNumber" placeholder="Ulica i broj" :disabled="editMode == false">
							</div>
						</div>
						<div class="form-group">
							<label for="amenities">Sadrzaj apartmana:</label>
							<div id="amenities">
								<div class="form-check form-check-inline" v-for="amenity in availableAmenities" :key="amenity.id">
									<input type="checkbox" class="form-check-input" v-bind:id="'amenity' + amenity.id" v-bind:value="amenity.id" v-model="apartment.amenityIds" :disabled="editMode == false">
									<label class="form-check-label" v-bind:for="'amenity' + amenity.id">{{ amenity.name }}</label>
								</div>
							</div>
						</div>
						<div class="form-row">
							<div class="col-sm-3 my-1">
								<label for="longitude">Geografska duzina:</label>
								<input id="longutude" type="text" class="form-control" v-model="apartment.location.longitude" placeholder="Geografska duzina" :disabled="editMode == false">
							</div>
							<div class="col-sm-3 my-1">
								<label for="latitude">Geografska sirina:</label>
								<input id="latitude" type="text" class="form-control" v-model="apartment.location.latitude" placeholder="Geografska sirina" :disabled="editMode == false">
							</div>
						</div>
						<div>
							<label for="photos">Slike:</label>
							<div id="photos" class="container">
								<div class="form-group" v-if="editMode">
								    <label for="image-upload">Dodajte sliku</label>
								    <input type="file" accept="image/x-png,image/jpeg" ref="image" class="form-control-file" id="image-upload" v-on:change="handleImageUpload">
									<button class="btn btn-primary" v-on:click="submitImage">Posalji</button>
									<p v-if="imageErrors.length">
										<b>{{imageErrors[0]}}</b>
									</p>
								</div>
								<div v-for="image in apartment.images">
									<img v-bind:src="image" alt="No image" style="width: 100%" class="col-md-3">
									<button class="btn btn-info btn-sm" @click="setMainImage(image)" v-if="editMode && image != apartment.images[0]">Postavi za glavnu</button>
									<button class="btn btn-danger btn-sm" @click="deleteImage(image)" v-if="editMode">Obrisi</button>
								</div>
							</div>
						</div>
					</div>
					<div class="my-2">
						<button class="btn btn-success" v-if="editMode" @click="submit">Sacuvaj izmene</button>
						<button class="btn btn-secondary" v-if="editMode" @click="cancel">Otkazi</button>
					</div>
				</div>
			</div>
		`
})