Vue.component('apartment-add', {
	data: function () {
		return {
			name: '',
			type: '',
			numberOfRooms: '',
			location: '',
			price: '',
			checkInTime: '',
			checkOutTime: '',
			amenitiyIds: [],
		}
	},
	template:
		`
			<div>
				<h1>Dodavanje apartmana</h1>
			</div>
		`
})