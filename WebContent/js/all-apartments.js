Vue.component('all-apartments', {
	data: function() {
		return {
			apartments: [],
			search: '',
			checkedType:[],
			checkedAmenities:[],
			checkedStatus:[],
			amenities:[]
		}
	},
	mounted: function () {
		axios
		.get('rest/apartments')
		.then(response => (this.apartments = response.data));
		axios
		.get('rest/amenities')
		.then(response => (this.amenities = response.data))
	},
	computed: {
		searchApartments() {
			return this.apartments.filter(a => {
				var name=false
				if (a.name.toLowerCase().includes(this.search.toLowerCase())) {
					name= true;
				}
				var type=false
				if(this.checkedType.length==0)
					type=true
				if(this.checkedType.includes(a.type))
					type=true
				
				var status=false
				if(this.checkedStatus.length==0)
					status=true
				if(this.checkedStatus.includes(a.status))
					status=true
				
				var hasAmenities=true;
				
				if(this.checkedAmenities!=0){
					this.checkedAmenities.forEach(am=>{
						if(!a.amenityIds.includes(am))
							hasAmenities=false;
					})
			
				}
				
				if(type&&status&&hasAmenities)
					return a
			})
		}
	},
	template:
		`
		<div class="container">
			<div class="row justify-content-around align-items-center d-flex">
	    	<div class="col-3 align-items-center">
				<div class="search-wrapper">
	  				<input type="text" v-model="search" placeholder="Pretraga apartmana"/>
				</div>
			</div>
			<div class="col-3 align-items-center">
				<div class="row my-3">
					<label class="custom-control" >
					<input type="checkbox" class="custom-control-input" id="room" value="room" v-model="checkedType">
					<label class="custom-control-label" for="room">Soba</label>
					</label>
				</div>
				<div class="row my-3">
					<label class="custom-control" >
					<input type="checkbox" class="custom-control-input" id="fullApartment" value="fullApartment" v-model="checkedType">
					<label class="custom-control-label" for="fullApartment">Ceo apartman</label>
					</label>
				</div>
			</div>
			<div class="col-3 align-items-center">
				<div class="row my-3">
					<label class="custom-control" >
					<input type="checkbox" class="custom-control-input" id="Active" value="Active" v-model="checkedStatus">
					<label class="custom-control-label" for="Active">Aktivan</label>
					</label>
				</div>
				<div class="row my-3">
					<label class="custom-control" >
					<input type="checkbox" class="custom-control-input" id="Inactive" value="Inactive" v-model="checkedStatus">
					<label class="custom-control-label" for="Inactive">Neaktivan</label>
					</label>
				</div>
			</div>
			<div class="col-3 align-items-center">
				<div class="row d-flex justify-content-between">
				<div v-for="a in amenities">
					<label class="custom-control" >
					<input type="checkbox" class="custom-control-input" v-bind:id="a.id" v-bind:value="a.id" v-model="checkedAmenities">
					<label class="custom-control-label" v-bind:for="a.id">{{a.name}}</label>
					</label>
				</div>
				</div>
			</div>
			
	    	<div class="row d-flex justify-content-between">
	    		<apartment-item v-for="apartment in searchApartments" v-bind:key="apartment.id" :apartment="apartment" class="col-md-3 m-4">
	    		</apartment-item>
	    	</div>
			</div>
		</div>
		`
})