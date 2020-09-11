Vue.component("apartment-item", {
	props: {
		apartment: Object
	},
	methods: {
		click(id){
			router.push('/apartment/' + id)
		}
	},
	template:
		`
		<div class="btn border border-primary rounded" @click="click(apartment.id)">
			<img v-bind:src="apartment.images[0]" alt="No image" style="width: 100%" v-if="apartment.images">
			<img src="resources/images/0.jpg" alt="No image" style="width: 100%" v-else>
			
			<br>
			<div class="container">
				<div class="col">
					{{ apartment.name }}
				</div>
				<div class="col text-muted" v-if="apartment.location">
					{{ apartment.location.address.place }} {{ apartment.location.address.zipCode }}
				</div>
			</div>
		</div>
		`
})