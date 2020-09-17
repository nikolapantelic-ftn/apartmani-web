Vue.component('all-reservations', {
	data: function (){
		return {
			reservations: [],
			key:0,
			search:''
		};
	},
	mounted() {
		axios
			.get('rest/reservations')
			.then(response => (this.reservations = response.data));
	},
	methods: {
		update: function() {
			axios
				.get('rest/reservations/guest/' + app.user.id)
				.then(response => (this.reservations = response.data));
		},
		sortPriceLH:function(){
			this.reservations.sort((a,b)=>{
				return a.totalPrice-b.totalPrice
			})
			this.keyI+=1;
			},
		
		sortPriceHL:function(){
			this.reservations.sort((a,b)=>{
				return b.totalPrice-a.totalPrice
			})
			this.keyI+=1;
			},
	},
	computed:{
		filteredReservations(){
			return this.reservations.filter(r=>{
				if(this.search=="")
					return r
				if(this.search==r.guest)
					return r
			})
		}
	},
	
	template:
		`
			
			<div class="container">
			<div class="col mb-4">
				<div class="search-wrapper">
	  				<input type="text" v-model="search" placeholder="Pretraga po korisnickom imenu"/>
				</div>
			</div>
				<div class="flex-row">
			<button type="button pr-2" class="btn btn-primary  " v-on:click="sortPriceLH" > Cena rastuca </button>
			<button type="button" class="btn btn-primary " v-on:click="sortPriceHL" > Cena opadajuca </button>
			</div>
				<reservation-item v-on:update="update" v-for="reservation in filteredReservations" v-bind:key="reservation.id" :reservation="reservation"></reservation-item>
			</div>
		`
})