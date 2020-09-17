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
			<div>
			<div class="container">
			<div class="row justify-content-around align-items-center d-flex">
				<div class="col-3 align-items-center">
					<div class="search-wrapper">
	  					<input type="text" v-model="search" placeholder="Pretraga po korisnickom imenu"/>
					</div>
				</div>
				<div class="col-3 align-items-center">
					<div class="row">
					<button type="button pr-2" class="btn btn-primary  " v-on:click="sortPriceLH" > Cena rastuca </button>
					</div>
					<div class="row mt-2">
					<button type="button" class="btn btn-primary " v-on:click="sortPriceHL" > Cena opadajuca </button>
					</div>
				</div>	
				<div class="col-3 align-items-center">
					<div class="row my-3">
						<label class="custom-control" >
					 		<input class="custom-control-input" type="checkbox" id="accepted" value="accepted" v-model="checkedNames">
							<label class="custom-control-label" for="accepted">Prihvacena</label>
						</label>
					</div>
					<div class="row my-3">
						<label class="custom-control" >
							<input class="custom-control-input" type="checkbox" id="created" value="created" v-model="checkedNames">
							<label class="custom-control-label" for="created">Kreirana</label>
						</label>
					</div>	
					<div class="row my-3">
						<label  class="custom-control" >
							<input class="custom-control-input"  type="checkbox" id="rejected" value="rejected" v-model="checkedNames">
							<label class="custom-control-label" for="rejected">Odbijena</label>
						</label>
					</div>
					</div>
					<div class="col-3 align-items-center">
					<div class="row my-3">
						<label class="custom-control" >
							<input class="custom-control-input" type="checkbox" id="canceled" value="canceled" v-model="checkedNames">
							<label class="custom-control-label" for="canceled">Otkazana</label>
						</label>
					</div>
					<div class="row my-3">
						<label class="custom-control" >
							<input class="custom-control-input" type="checkbox" id="finished" value="finished" v-model="checkedNames">
							<label class="custom-control-label" for="finished">Zavrsena</label>
						</label>
					</div>
		
				</div>
			</div>
			</div>
				<reservation-item v-on:update="update" v-for="reservation in filteredReservations" v-bind:key="reservation.id" :reservation="reservation"></reservation-item>
			</div>
			</div>
		`
})