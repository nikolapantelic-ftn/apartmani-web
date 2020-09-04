Vue.component("index", {
	data: function() {
		return {
			apartments: []
		}
	},
	mounted: function () {
		axios
		.get('rest/apartments')
		.then(response => (this.apartments = response.data));
	},
	template:
		`
		<div class="container">
	    	<booking-form></booking-form>
	    	<div class="row d-flex justify-content-between">
	    		<apartment-item v-for="apartment in apartments" v-bind:key="apartment.id" :apartment="apartment" class="col-md-3 m-4">
	    		</apartment-item>
	    	</div>
		</div>
		`
})