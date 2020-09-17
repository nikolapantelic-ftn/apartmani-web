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
			country:'',
			zipCode: '',
			longitude: '',
			latitude: '',
			image: '',
			imageErrors: [],
			hasErrors: false
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
		map.on('click', event => {
			var lonlat = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
			this.longitude = lonlat[0];
			this.latitude = lonlat[1];
			axios.get('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + this.longitude + '&lat=' + this.latitude + '&accept-language=sr-Latn')
			.then(response => {
				this.place = this.convert(response.data.address.city);
				this.country = this.convert(response.data.address.country);
				this.zipCode = response.data.address.postcode;
				this.streetAndNumber = response.data.address.road + ' ' + response.data.address.house_number;
			})
		});
	},
	methods: {
		submitApartment(e) {
			e.preventDefault();
			this.hasErrors = false;
			this.checkForm();
			if (this.hasErrors) return;
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
						country:this.country,
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
					alert('Apartman uspesno kreiran.');
					router.push('/');
				})
				.catch(e => {
					alert('Greska pri kreiranju apartmana.')
					console.log(e)
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
		},
		checkForm() {
			if (!this.name || !this.type 
				|| !parseInt(this.numberOfRooms)
				|| !parseInt(this.numberOfGuests)
				|| !parseInt(this.price)
				|| !this.place 
				|| !this.streetAndNumber 
				|| !this.country 
				|| !this.zipCode
				|| !parseFloat(this.longitude)
				|| !parseFloat(this.latitude)
				|| this.checkInTime == 'Vreme prijave'
				|| this.checkInTime == 'Vreme odjave') {
					this.hasErrors = true;
				}
		},
		convert: function (string) {
			var cyrillic = 'А_Б_В_Г_Д_Ђ_Е_Ё_Ж_З_И_Й_Ј_К_Л_Љ_М_Н_Њ_О_П_Р_С_Т_Ћ_У_Ф_Х_Ц_Ч_Џ_Ш_Щ_Ъ_Ы_Ь_Э_Ю_Я_а_б_в_г_д_ђ_е_ё_ж_з_и_й_ј_к_л_љ_м_н_њ_о_п_р_с_т_ћ_у_ф_х_ц_ч_џ_ш_щ_ъ_ы_ь_э_ю_я'.split('_')
		    var latin = 'A_B_V_G_D_Đ_E_Ë_Ž_Z_I_J_J_K_L_Lj_M_N_Nj_O_P_R_S_T_Ć_U_F_H_C_Č_Dž_Š_Ŝ_ʺ_Y_ʹ_È_Û_Â_a_b_v_g_d_đ_e_ë_ž_z_i_j_j_k_l_lj_m_n_nj_o_p_r_s_t_ć_u_f_h_c_č_dž_š_ŝ_ʺ_y_ʹ_è_û_â'.split('_')
		
		    return string.split('').map(function(char) {
				var index = cyrillic.indexOf(char)
				if (!~index) return char
				return latin[index]
				}).join('');
		}
	},
	template:
		`
			<div class="container">
				<h1>Dodavanje apartmana</h1>
				<form>
					<div class="form-group">
						<input type="text" class="form-control" v-bind:class="{ 'is-invalid': hasErrors && !name }" v-model="name" placeholder="Naziv">
					</div>
					<div class="form-group">
			    		<label for="type">Tip apartmana:</label>
			    		<div id="type">
			    			<div class="form-check form-check-inline">
					    		<input class="form-check-input" v-bind:class="{ 'is-invalid': hasErrors && !type }" v-model='type' type="radio" id="full-apartment" value="fullApartment">
				                <label class="form-check-label" for="full-apartment">Ceo apartman</label>
			                </div>
			                <div class="form-check form-check-inline">
				                <input class="form-check-input" v-bind:class="{ 'is-invalid': hasErrors && !type }" v-model='type' type="radio" id="room" value="room">
				                <label class="form-check-label" for="room">Soba</label>
			                </div>
		                </div> 	
			    	</div>
			    	<div class="form-group">
			    		<div class="input-group">
			    			<input type="text" class="form-control col-md-2" v-bind:class="{ 'is-invalid': hasErrors && !parseInt(price) }" v-model="price" placeholder="Cena nocenja">
			    			<div class="input-group-append">
			    				<div class="input-group-text">din.</div>
			    			</div>
			    		</div>
			    	</div>
					<div class="form-group">
						<input type="number" class="form-control col-md-2" v-bind:class="{ 'is-invalid': hasErrors && !parseInt(numberOfRooms) }" v-model="numberOfRooms" placeholder="Broj soba">
					</div>
					<div class="form-group">
						<input type="number" class="form-control col-md-2" v-bind:class="{ 'is-invalid': hasErrors && !parseInt(numberOfGuests) }" v-model="numberOfGuests" placeholder="Broj gostiju">
					</div>
			    	<div class="form-row">
			    		<div class="col-sm-3">
			    			<select class="custom-select" v-bind:class="{ 'is-invalid': hasErrors && checkInTime == 'Vreme prijave' }" id="check-in-time" v-model="checkInTime">
			    				<option selected disabled hidden>Vreme prijave</option>
								<option value="00:00">00:00</option>
								<option value="01:00">01:00</option>
								<option value="02:00">02:00</option>
								<option value="03:00">03:00</option>
								<option value="04:00">04:00</option>
								<option value="05:00">05:00</option>
								<option value="06:00">06:00</option>
								<option value="07:00">07:00</option>
								<option value="08:00">08:00</option>
								<option value="09:00">09:00</option>
								<option value="10:00">10:00</option>
								<option value="11:00">11:00</option>
								<option value="12:00">12:00</option>
								<option value="13:00">13:00</option>
								<option value="14:00">14:00</option>
								<option value="15:00">15:00</option>
								<option value="16:00">16:00</option>
								<option value="17:00">17:00</option>
								<option value="18:00">18:00</option>
								<option value="19:00">19:00</option>
								<option value="20:00">20:00</option>
								<option value="21:00">21:00</option>
								<option value="22:00">22:00</option>
								<option value="23:00">23:00</option>
			    			</select>
			    		</div>
			    		<div class="col-sm-3">
			    			<select class="custom-select" v-bind:class="{ 'is-invalid': hasErrors && checkOutTime == 'Vreme odjave' }" id="check-out-time" v-model="checkOutTime">
			    				<option selected hidden disabled>Vreme odjave</option>
								<option value="00:00">00:00</option>
								<option value="01:00">01:00</option>
								<option value="02:00">02:00</option>
								<option value="03:00">03:00</option>
								<option value="04:00">04:00</option>
								<option value="05:00">05:00</option>
								<option value="06:00">06:00</option>
								<option value="07:00">07:00</option>
								<option value="08:00">08:00</option>
								<option value="09:00">09:00</option>
								<option value="10:00">10:00</option>
								<option value="11:00">11:00</option>
								<option value="12:00">12:00</option>
								<option value="13:00">13:00</option>
								<option value="14:00">14:00</option>
								<option value="15:00">15:00</option>
								<option value="16:00">16:00</option>
								<option value="17:00">17:00</option>
								<option value="18:00">18:00</option>
								<option value="19:00">19:00</option>
								<option value="20:00">20:00</option>
								<option value="21:00">21:00</option>
								<option value="22:00">22:00</option>
								<option value="23:00">23:00</option>
			    			</select>
			    		</div>
			    	</div>
					<div class="form-row">
						<div class="col-sm-3 my-3">
							<input type="text" class="form-control" v-bind:class="{ 'is-invalid': hasErrors && !zipCode }" v-model="zipCode" placeholder="Postanski broj">
						</div>
						<div class="col-sm-3 my-3">
							<input type="text" class="form-control" v-bind:class="{ 'is-invalid': hasErrors && !country }" v-model="country" placeholder="Drzava">
						</div>
						<div class="col-sm-3 my-3">
							<input type="text" class="form-control" v-bind:class="{ 'is-invalid': hasErrors && !place }" v-model="place" placeholder="Mesto">
						</div>
						<div class="col-sm-3 my-3">
							<input type="text" class="form-control" v-bind:class="{ 'is-invalid': hasErrors && !streetAndNumber }" v-model="streetAndNumber" placeholder="Ulica i broj">
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
							<input type="text" class="form-control" v-bind:class="{ 'is-invalid': hasErrors && !parseFloat(longitude) }" v-model="longitude" placeholder="Geografska duzina">
						</div>
						<div class="col-sm-3 my-1">
							<input type="text" class="form-control" v-bind:class="{ 'is-invalid': hasErrors && !parseFloat(latitude) }" v-model="latitude" placeholder="Geografska sirina">
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
					<div v-if="hasErrors" class="text-danger">Sva polja moraju biti popunjena.</div>
				</form>
			</div>
		`
});