Vue.component("simple-search", {
	data: function () {
		return {
			guests: [],
			apartments: [],
			hosts: [],
			admins: []
		}
	},
	template: 
		`
			<div class="container">
				<h4 class="text-muted" v-if="!(guests.length || apartments.lentgth || hosts.length || admins.length)">Pretraga ne odgovara ni jednoj stavci</h4>
				<div id="guests" v-if="guests.length">
					<label for="guests">Gosti</label>
				</div>
				<div id="apartments" v-if="apartments.length">
					<label for="apartments">Apartmani</label>
				</div>
				<div id="hosts" v-if="hosts.length">
					<label for="hosts">Domacini</label>
				</div>
				<div id="admins" v-if="admins.length">
					<label for="admins">Administratori</label>
				</div>
			</div>
		`
})