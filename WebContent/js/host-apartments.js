Vue.component('host-apartments', {
	data: function () {
		return {
			user: app.user,
			apartments: [],
			shownApartments: []
		};
	},
	mounted() {
		axios
			.get('rest/apartments/host/' + this.user.id)
			.then(response => {
				this.apartments = response.data;
				this.shownApartments = [...this.apartments];
				});
	},
	template: 
		`
			<div class="container">
				<h4>Moji apartmani</h4>
				<div id="active-apartments">
					<apartment-item v-for="apartment in shownApartments" v-bind:key="apartment.id" :apartment="apartment" class="col-md-3 m-4">
	    			</apartment-item>
				</div>
			</div>
		`
})