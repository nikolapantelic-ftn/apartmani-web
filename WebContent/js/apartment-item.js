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
		<div style="cursor: pointer;" class="border border-primary rounded py-2" @click="click(apartment.id)">
			<img v-bind:src="apartment.images[0]" alt="No image" style="width: 100%" v-if="apartment.images && apartment.images.length">
			<img src="resources/images/0.jpg" alt="No image" style="width: 100%" v-else>
			
			<br>
			<div class="container">
				<div class="row d-flex justify-content-center">
					{{ apartment.name }}
				</div>
				<div class="row text-muted d-flex justify-content-center" v-if="apartment.location">
					{{ apartment.location.address.place }} {{ apartment.location.address.zipCode }}
				</div>
			</div>
		</div>
		`
})