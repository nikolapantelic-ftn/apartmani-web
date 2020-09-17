Vue.component('host-apartments', {
	data: function () {
		return {
			user: app.user,
			apartments: [],
			shownApartments: [],
			view: 'active',
			placeFilter: '',
			nameFilter: '',
			minScoreFilter: '',
			maxScoreFilter: '',
			nameDescending: true,
			placeDescending: true,
			priceDescending: true,
			amenities: [],
			checkedAmenities: [],
			checkedTypes: [],
		};
	},
	mounted() {
		axios
			.get('rest/apartments/host/' + this.user.id)
			.then(response => {
				this.apartments = response.data;
				this.active();
				});
		axios
			.get('rest/amenities')
			.then(response => (this.amenities = response.data))
	},
	methods: {
		active: function () {
			this.view = 'active';
			this.shownApartments = [];
			this.apartments.forEach(a => {
				if (a.status == 'Active') {
					this.shownApartments.push(a);
				}
					
			});
		},
		inactive: function () {
			this.view = 'inactive';
			this.shownApartments = [];
			this.apartments.forEach(a => {
				if (a.status == 'Inactive') {
					this.shownApartments.push(a);
				}
			});
		},
		applyFilters: function () {
			if (this.view == 'inactive') {
				this.inactive();
			} else {
				this.active();
			}
			if (this.nameFilter) {
				this.shownApartments = this.shownApartments
					.filter(a => a.name.toLowerCase().includes(this.nameFilter.toLowerCase()));
			}
			if (this.placeFilter) {
				this.shownApartments = this.shownApartments
					.filter(a => a.location.address.place.toLowerCase().includes(this.placeFilter.toLowerCase()));
			}
			if (this.checkedTypes.length) {
				this.shownApartments = 
				this.shownApartments.filter(a => {
					let keep = false;
					this.checkedTypes.forEach(t => {
						console.log(a.type + ' ' + t);
						if (a.type == t) {
							keep = true;
							
						}
					});
					return keep;
				});
			}
			if (this.checkedAmenities.length) {
				this.shownApartments = this.shownApartments.filter(a => {
					let keep = true;
					this.checkedAmenities.forEach(am => {
						if(!a.amenityIds.includes(am))
							keep = false;
					});
					console.log(keep)
					return keep;
				})
			}
		},
		clearFilters: function () {
			this.nameFilter = '';
			this.placeFIlter = '';
			this.checkedTypes = [];
			this.checkedAmenities = [];
		},
		sortByName: function () {
			this.placeDescending = true;
			this.priceDescending = true;
			if (this.nameDescending) {
				this.shownApartments.sort((a1, a2) => this.compare(a1.name, a2.name));
			} else {
				this.shownApartments.sort((a1, a2) => this.compare(a2.name, a1.name));
			}
			this.nameDescending = !this.nameDescending;
		},
		sortByPlace: function () {
			this.nameDescending = true;
			this.priceDescending = true;
			if (this.placeDescending) {
				this.shownApartments.sort((a1, a2) => this.compare(a1.location.address.place, a2.location.address.place));
			} else {
				this.shownApartments.sort((a1, a2) => this.compare(a2.location.address.place, a1.location.address.place));
			}
			this.placeDescending = !this.placeDescending
		},
		sortByPrice: function () {
			this.nameDescending = true;
			this.placeDescending = true;
			if (this.priceDescending) {
				this.shownApartments.sort((a1, a2) => this.compare(a1.price, a2.price));
			} else {
				this.shownApartments.sort((a1, a2) => this.compare(a2.price, a1.price))
			}
			this.priceDescending = !this.priceDescending
		},
		compare: function (val1, val2) {
			if (val1 < val2) return -1;
			if (val1 > val2) return 1;
			return 0;
		}
	},
	template: 
		`
			<div>
			
				<div class="row">
					<div class="col-md-2 ml-5">
						<label for="sorting">Sortiraj po:</label>
						<div id="sorting">
							<div class="btn-group btn-group-toggle" data-toggle="buttons">
								<label class="btn btn-info" @click="sortByName">
									<input type="radio" autocomplete="off"> Naziv
								</label>
								<label class="btn btn-info" @click="sortByPlace">
									<input type="radio" autocomplete="off"> Mesto
								</label>
								<label class="btn btn-info" @click="sortByPrice">
									<input type="radio" autocomplete="off"> Cena
								</label>
							</div>
						</div>
						<label for="filtering" class="mt-4">Filteri:</label>
						<div id="filtering">
							<input type="text" class="form-control mb-2" placeholder="Naziv" v-model="nameFilter" @change="applyFilters">
							<input type="text" class="form-control my-2" placeholder="Mesto" v-model="placeFilter" @change="applyFilters">
							<div class="form-row my-3">
								<div class="form-check">
									<label class="custom-control" >
									<input type="checkbox" class="custom-control-input" @change="applyFilters" id="room" value="room" v-model="checkedTypes">
									<label class="custom-control-label" for="room">Soba</label>
									</label>
								</div>
								<div class="form-check">
									<label class="custom-control" >
									<input type="checkbox" class="custom-control-input" @change="applyFilters" id="fullApartment" value="fullApartment" v-model="checkedTypes">
									<label class="custom-control-label" for="fullApartment">Ceo apartman</label>
									</label>
								</div>
							</div>
							<div v-for="a in amenities">
								<label class="custom-control" >
								<input type="checkbox" class="custom-control-input" @change="applyFilters" v-bind:id="a.id" v-bind:value="a.id" v-model="checkedAmenities">
								<label class="custom-control-label" v-bind:for="a.id">{{a.name}}</label>
								</label>
							</div>
						</div>
					</div>
					<div class="col-md-8">
						<h4>Moji apartmani</h4>
						<div class="btn-group btn-group-toggle" data-toggle="buttons">
							<label class="btn btn-success active" @click="active(); clearFilters();">
								<input type="radio" autocomplete="off" checked> Aktivni
							</label>
							<label class="btn btn-secondary" @click="inactive(); clearFilters();">
								<input type="radio" autocomplete="off"> Neaktivni
							</label>
						</div>
						<div class="row d-flex justify-content-between" id="active-apartments">
							<apartment-item v-for="apartment in shownApartments" v-bind:key="apartment.id" :apartment="apartment" class="col-md-3 m-4">
			    			</apartment-item>
						</div>
					</div>
				</div>
			</div>
		`
})