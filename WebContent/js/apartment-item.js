Vue.component("apartment-item", {
	props: {
		apartment: Object
	},
	methods: {
		click (){
			alert("clicked");
		}
	},
	template:
		`
		<div class="btn border border-primary rounded" @click="click">
			<img src="resources/images/no-image.jpg" alt="No image" style="width: 100%"><br>
			prozor apartmana
			{{ apartment.id }}
		</div>
		`
})