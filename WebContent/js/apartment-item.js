Vue.component("apartment-item", {
	props: {
		apartment: Object
	},
	methods: {
		click(id){
			router.push('/apartment/:' + id)
		}
	},
	template:
		`
		<div class="btn border border-primary rounded" @click="click(apartment.id)">
			<img src="resources/images/no-image.jpg" alt="No image" style="width: 100%"><br>
			<div class="container">
				<div class="col">
					{{ apartment.name }}
				</div>
				<div class="col text-muted">
					{{ apartment.location.address.place }} {{ apartment.location.address.zipCode }}
				</div>
			</div>
		</div>
		`
})