Vue.component('all-reservations', {
	data: function (){
		return {
			reservations: [],
			key:0,
			search:'',
			checkedNames:[]
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
				var username=false
				if(this.search=="")
					username=true
				if(this.search==r.guest)
					username=true
				var status=false;
				if(this.checkedNames.length==0)
					status=true
				if(this.checkedNames.includes(r.status)){
				
					status=true
				}
				if(username && status)
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
			<div class="row my-3">
			<input type="checkbox" id="accepted" value="accepted" v-model="checkedNames">
			<label for="accepted">Prihvacena</label>
			<input type="checkbox" id="created" value="created" v-model="checkedNames">
			<label for="created">Kreirana</label>
			<input type="checkbox" id="rejected" value="rejected" v-model="checkedNames">
			<label for="rejected">Odbijena</label>
			<input type="checkbox" id="canceled" value="canceled" v-model="checkedNames">
			<label for="canceled">Otkazana</label>
			<input type="checkbox" id="finished" value="finished" v-model="checkedNames">
			<label for="finished">Zavrsena</label>
			</div>
			</div>
				<reservation-item v-on:update="update" v-for="reservation in filteredReservations" v-bind:key="reservation.id" :reservation="reservation"></reservation-item>
			</div>
		`
})