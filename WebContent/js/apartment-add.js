Vue.component('apartment-add', {
	data: function () {
		return {
			name: '',
			type: '',
			numberOfRooms: '',
			numberOfGuests: '',
			price: '',
			checkInTime: 'Vreme prijave',
			checkOutTime: 'Vreme odjave',
			amenityIds: [],
			availableAmenities: [],
			availableDates: [],
			streetAndNumber: '',
			images: [],
			place: '',
			zipCode: '',
			longitude: '',
			latitude: '',
			image: '',
			imageErrors: [],
		}
	},
	mounted: function () {
		axios
			.get('rest/amenities/active')
			.then(response => {
				this.availableAmenities = response.data;
			});
		var map = new ol.Map({
		        layers: [
		          new ol.layer.Tile({
		            source: new ol.source.OSM()
		          })
		        ],
		        controls: ol.control.defaults({
		          // Set to display OSM attributions on the bottom right control
		          attributionOptions:  {
		            collapsed: false
		          }
		        }).extend([
		          new ol.control.ScaleLine() // Add scale line to the defaults controls
		        ]),
		        target: 'map',
		        view: new ol.View({
		          center: ol.proj.fromLonLat([10, 0]),
		          zoom: 4
		        })
		      });
	},
	methods: {
		submitApartment: function () {
			var data = {
				id: '0',
				name: this.name,
				type: this.type,
				numberOfRooms: this.numberOfRooms,
				numberOfGuests: this.numberOfGuests,
				location: {
					id: '0',
					longitude: this.longitude,
					latitude: this.latitude,
					address: {
						id: '0',
						streetAndNumber: this.streetAndNumber,
						place: this.place,
						zipCode: this.zipCode,
						deleted: 'false'
					},
					deleted: 'false'
				},
				availableDates: this.availableDates,
				images: this.images,
				host: app.user.id,
				price: this.price,
				checkInTime: this.checkInTime,
				checkOutTime: this.checkOutTime,
				status: 'Inactive',
				amenityIds: this.amenityIds,
				deleted: 'false'
			};
			axios
				.post('rest/apartments', data)
				.then(response => {
					alert(response.data);
				})
				.catch(e => {
					console.log(e.response.data)
				})
		},
		handleImageUpload() {
			this.image = this.$refs.image.files[0];
		},
		submitImage(e) {
			e.preventDefault();
			this.imageErrors = [];
			if (!this.image) {
				this.imageErrors.push("Morate izabrati sliku.");
				return;
			}
			let ext = this.image.name.split('.').pop().toLowerCase();
			if (ext !== 'jpg' && ext !== 'png') {
				this.imageErrors.push("Format slike nije podrzan.");
				return;
			}
			axios
				.post('rest/images/' + ext,
				this.image,
				{
					headers: {
						'Content-Type': 'application/octet-stream'
					}
				})
				.then(response => {
					this.images.push(response.data);
					alert("Slika poslata.");
				})
				.catch(function () {
					alert("Slika nije poslata.");
				});
		}
	},
	template:
		`
			<div class="container">
				<h1>Dodavanje apartmana</h1>
				<form>
					<div class="form-group">
						<input type="text" class="form-control" v-model="name" placeholder="Naziv">
					</div>
					<div class="form-group">
			    		<label for="type">Tip apartmana:</label>
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
			    			<input type="text" class="form-control col-md-2" v-model="price" placeholder="Cena nocenja">
			    			<div class="input-group-append">
			    				<div class="input-group-text">din.</div>
			    			</div>
			    		</div>
			    	</div>
					<div class="form-group">
						<input type="text" class="form-control col-md-2" v-model="numberOfRooms" placeholder="Broj soba">
					</div>
					<div class="form-group">
						<input type="text" class="form-control col-md-2" v-model="numberOfGuests" placeholder="Broj gostiju">
					</div>
			    	<div class="form-row">
			    		<div class="col-sm-3">
			    			<select class="custom-select" id="check-in-time" v-model="checkInTime">
			    				<option selected disabled hidden>Vreme prijave</option>
								<option value="14:00">14:00</option>
			    			</select>
			    		</div>
			    		<div class="col-sm-3">
			    			<select class="custom-select" id="check-out-time" v-model="checkOutTime">
			    				<option selected hidden disabled>Vreme odjave</option>
								<option value="10:00">10:00</option>
			    			</select>
			    		</div>
			    	</div>
					<div class="form-row">
						<div class="col-sm-3 my-3">
							<input type="text" class="form-control" v-model="zipCode" placeholder="Postanski broj">
						</div>
						<div class="col-sm-3 my-3">
							<input type="text" class="form-control" v-model="place" placeholder="Mesto">
						</div>
						<div class="col-sm-5 my-3">
							<input type="text" class="form-control" v-model="streetAndNumber" placeholder="Ulica i broj">
						</div>
					</div>
			    	<div class="form-group">
						<label for="amenities">Sadrzaj apartmana:</label>
						<div id="amenities">
							<div class="form-check form-check-inline" v-for="amenity in availableAmenities" :key="amenity.id">
								<input type="checkbox" class="form-check-input" v-bind:id="'amenity' + amenity.id" v-bind:value="amenity.id" v-model="amenityIds">
								<label class="form-check-label" v-bind:for="'amenity' + amenity.id">{{ amenity.name }}</label>
							</div>
						</div>
					</div>
					<div id="map" class="map"></div>
					<div class="form-row">
						<div class="col-sm-3 my-1">
							<input type="text" class="form-control" v-model="longitude" placeholder="Geografska duzina">
						</div>
						<div class="col-sm-3 my-1">
							<input type="text" class="form-control" v-model="latitude" placeholder="Geografska sirina">
						</div>
					</div>
			    	<div class="form-group">
					    <label for="image-upload">Dodajte sliku</label>
					    <input type="file" accept="image/x-png,image/jpeg" ref="image" class="form-control-file" id="image-upload" v-on:change="handleImageUpload">
						<button class="btn btn-primary" v-on:click="submitImage">Posalji</button>
						<p v-if="imageErrors.length">
							<b>{{imageErrors[0]}}</b>
						</p>
					</div>
			    	<button class="btn btn-primary" v-on:click="submitApartment">Prijavi</button>
				</form>
			</div>
		`
});