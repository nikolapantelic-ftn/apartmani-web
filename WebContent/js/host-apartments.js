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
			scoreDescending: true,
		};
	},
	mounted() {
		axios
			.get('rest/apartments/host/' + this.user.id)
			.then(response => {
				this.apartments = response.data;
				this.active();
				});
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
			if (this.minScoreFilter) {
				//TODO
			}
			if (this.maxScoreFilter) {
				//TODO
			}
		},
		clearFilters: function () {
			this.nameFilter = '';
			this.placeFIlter = '';
			this.minScoreFilter = '';
			this.maxScoreFilter = '';
		},
		sortByName: function () {
			this.placeDescending = true;
			this.scoreDescending = true;
			if (this.nameDescending) {
				this.shownApartments.sort((a1, a2) => this.compare(a1.name, a2.name));
			} else {
				this.shownApartments.sort((a1, a2) => this.compare(a2.name, a1.name));
			}
			this.nameDescending = !this.nameDescending;
		},
		sortByPlace: function () {
			this.nameDescending = true;
			this.scoreDescending = true;
			if (this.placeDescending) {
				this.shownApartments.sort((a1, a2) => this.compare(a1.location.address.place, a2.location.address.place));
			} else {
				this.shownApartments.sort((a1, a2) => this.compare(a2.location.address.place, a1.location.address.place));
			}
			this.placeDescending = !this.placeDescending
		},
		sortByScore: function () {
			this.nameDescending = true;
			this.placeDescending = true;
		},
		compare: function (val1, val2) {
			if (val1 < val2) return -1;
			if (val1 > val2) return 1;
			return 0;
		}
	},
	template: 
		`
			<div class="row">
				<div class="ml-5">
					<label for="sorting">Sortiraj po:</label>
					<div id="sorting">
						<div class="btn-group btn-group-toggle" data-toggle="buttons">
							<label class="btn btn-info" @click="sortByName">
								<input type="radio" autocomplete="off"> Naziv
							</label>
							<label class="btn btn-info" @click="sortByPlace">
								<input type="radio" autocomplete="off"> Mesto
							</label>
							<label class="btn btn-info">
								<input type="radio" autocomplete="off"> Ocena
							</label>
						</div>
					</div>
					<label for="filtering" class="mt-4">Filteri:</label>
					<div id="filtering">
						<input type="text" class="form-control mb-2" placeholder="Naziv" v-model="nameFilter" @change="applyFilters">
						<input type="text" class="form-control my-2" placeholder="Mesto" v-model="placeFilter" @change="applyFilters">
						<div class="form-inline mb-2">
							<select class="custom-select form-control mr-1">
								<option selected value="">Min. ocena</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
							<select class="custom-select form-control ml-1">
								<option selected value="">Max. ocena</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
						</div>
					</div>
				</div>
				<div class="container">
					<h4>Moji apartmani</h4>
					<div class="btn-group btn-group-toggle" data-toggle="buttons">
						<label class="btn btn-success active" @click="active(); clearFilters();">
							<input type="radio" autocomplete="off" checked> Aktivni
						</label>
						<label class="btn btn-secondary" @click="inactive(); clearFilters();">
							<input type="radio" autocomplete="off"> Neaktivni
						</label>
					</div>
					<div id="active-apartments">
						<apartment-item v-for="apartment in shownApartments" v-bind:key="apartment.id" :apartment="apartment" class="col-md-3 m-4">
		    			</apartment-item>
					</div>
				</div>
			</div>
		`
})