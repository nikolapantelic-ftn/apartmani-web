Vue.component('all-apartments', {
	data: function() {
		return {
			apartments: [],
			search: ''
		}
	},
	mounted: function () {
		axios
		.get('rest/apartments')
		.then(response => (this.apartments = response.data));
	},
	computed: {
		searchApartments() {
			return this.apartments.filter(a => {
				if (a.name.toLowerCase().includes(this.search.toLowerCase())) {
					return true;
				}
				return false;
			});
		}
	},
	template:
		`
		<div class="container">
	    	<div class="col mb-3">
				<div class="search-wrapper">
	  				<input type="text" v-model="search" placeholder="Pretraga apartmana"/>
				</div>
			</div>
	    	<div class="row d-flex justify-content-between">
	    		<apartment-item v-for="apartment in searchApartments" v-bind:key="apartment.id" :apartment="apartment" class="col-md-3 m-4">
	    		</apartment-item>
	    	</div>
		</div>
		`
})