Vue.component('apartment-search',{
	data:function(){
		return{
			apartmentList:[],
			location:this.$route.query.location,
			startDate:this.$route.query.sDate,
			endDate:this.$route.query.eDate,
			guests:this.$route.query.guests,
			rooms:this.$route.query.rooms,
			min:0,
			max:10000,
			amenities:[],
			checkedAmanities:[],
			keyI:0,
			available:true
			
			
		}
	},
	mounted(){
		if(this.location==("")){
			this.location=" ";
		}
		axios
		.get('rest/apartments')
		.then(response => {
		this.apartmentList = response.data})
		axios
		.get('rest/amenities')
		.then(response => {
		this.amenities = response.data})
		
		
	},
	computed: {
	filterAmanities(apartment){
		this.checkedAmanities.forEach(a=>{
			apartment.amenitiyIds.forEach(am=>{
				if(am.name==a){
					return true;
				}
			})
		})
		return false;
	},
	activeAmenities(){
		return this.amenities.filter(a=>{
			if(!a.deleted)
			return a
		})
	},
    filteredApartments() {
      return this.apartmentList.filter(apartment => {
		this.checkAvailability(apartment)
		var appAmenities=[];
		apartment.amenityIds.forEach(a=>{
			appAmenities.push(a);
		})
		var hasAmenities=true;
		
		this.checkedAmanities.forEach(a=>{
			if(!appAmenities.includes(a))
			hasAmenities=false;
		})
			var location=false
			if(this.location=='')
				location=true
			if(this.location.toLowerCase()==apartment.location.address.place.toLowerCase())
				location=true
		
       if(apartment.price<=this.max && apartment.price>=this.min && hasAmenities && !apartment.deleted && apartment.status=='Active' && this.available &&location)
		return apartment;
      })

    
	},
	
	},
	methods:{
		sortPriceLH:function(){
			this.filteredApartments.sort((a,b)=>{
				return a.price-b.price
			})
			this.keyI+=1;
			let map=new Map()
			this.amenities.forEach(a=>{
				
				map[a.id]=a
			})
			this.map=map
			
		
		
			
		},
		sortPriceHL:function(){
			this.filteredApartments.sort((a,b)=>{
				return b.price-a.price
			})
			this.keyI+=1;
		
			
		},
		
		checkAvailability: function (apartment) {
			var id=apartment.id
			if(this.startDate!='null' && this.endDate!='null'){
				var date=new Date(this.startDate)
				var end=new Date(this.endDate)
				var diffTime = Math.abs(date - end);
				var nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
				axios
				.post('rest/reservations/available', {
					apartment: id,
					startDate:date,
					nightsNumber: nights
				})
				.then(response => {
					if (response.data == true) {
						this.available = true;
					} else {
						this.available = false;
					}
				})
				
			}
	},
	},
	template:
	`
	<div class="containter">
	<div class="row">
	<div class="col-3">
	<div class="container-fluid mt-100">
     <div class="row d-flex justify-content-center">
         
             <div class="card w-100">
				<article class="filter-group">
                     <header class="card-header"> <a href="#" data-toggle="collapse" data-target="#collapse_aside0" data-abc="true" aria-expanded="false" class="collapsed"> <i class="icon-control fa fa-chevron-down"></i>
                             <h6 class="title">Lokacija</h6>
							
                         </a> </header>
                     <div class="filter-content collapse show" id="collapse_aside0" style="">
                         <div class="card-body">
                           <input class="form-control mr-sm-2" type="search" v-model="location" aria-label="Search">  	
                         </div>
                     </div>
                 </article>
                 <article class="filter-group">
                     <header class="card-header"> <a href="#" data-toggle="collapse" data-target="#collapse_aside1" data-abc="true" aria-expanded="false" class="collapsed"> <i class="icon-control fa fa-chevron-down"></i>
                             <h6 class="title">Datum prijave </h6>
                         </a> </header>
                     <div class="filter-content collapse show" id="collapse_aside1" style="">
                         <div class="card-body">
                             <input class="form-control" type="date"  v-model="startDate">
                         </div>
                     </div>
                 </article>
				<article class="filter-group">
                     <header class="card-header"> <a href="#" data-toggle="collapse" data-target="#collapse_aside1-2" data-abc="true" aria-expanded="false" class="collapsed "> <i class="icon-control fa fa-chevron-down"></i>
                             <h6 class="title">Datum odjave </h6>
                         </a> </header>
                     <div class="filter-content collapse show" id="collapse_aside1-2" style="">
                         <div class="card-body">
                             <input class="form-control" type="date"  v-model="endDate">
                         </div>
                     </div>
                 </article>
                 <article class="filter-group">
                     <header class="card-header"> <a href="#" data-toggle="collapse" data-target="#collapse_aside2" data-abc="true" aria-expanded="false" class="collapsed"> <i class="icon-control fa fa-chevron-down"></i>
                             <h6 class="title">Cena </h6>
                         </a> </header>
                     <div class="filter-content collapse show" id="collapse_aside2" style="">
                         <div class="card-body"> <input type="range" class="custom-range" v-model="min" min="0" v-bind:max="max" name="">
                             <div class="form-row">
                                 <div class="form-group col-md-6"> <label>Min</label> <input class="form-control" placeholder="$0" v-model="min" type="number"> </div>
                                 <div class="form-group text-right col-md-6"> <label>Max</label> <input class="form-control" v-model="max" placeholder="$1,0000" type="number"> </div>
                             </div> 
                         </div>
                     </div>
                 </article>
                 <article class="filter-group">
                     <header class="card-header"> <a href="#" data-toggle="collapse" data-target="#collapse_aside3" data-abc="true" aria-expanded="false" class="collapsed"> <i class="icon-control fa fa-chevron-down"></i>
                             <h6 class="title">Broj soba </h6>
                         </a> </header>
                     <div class="filter-content collapse" id="collapse_aside3" style="">
                         <div class="card-body">
						 <select class="d-flex form-control  text-center" v-model="rooms" >
  							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							
						</select>
					 </div>
                     </div>
                 </article>
                 <article class="filter-group">
                     <header class="card-header"> <a href="#" data-toggle="collapse" data-target="#collapse_aside4" data-abc="true" class="collapsed" aria-expanded="false"> <i class="icon-control fa fa-chevron-down"></i>
                             <h6 class="title">Broj osoba </h6>
                         </a> </header>
                     <div class="filter-content collapse" id="collapse_aside4" style="">
                         <div class="card-body">
 							<select class="form-control  text-center" v-model="guests" >
  								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
							
						</select>
					 </div>

                     </div>
                 </article>
				<article class="filter-group">
                     <header class="card-header"> <a href="#" data-toggle="collapse" data-target="#collapse_aside5" data-abc="true" class="collapsed" aria-expanded="false"> <i class="icon-control fa fa-chevron-down"></i>
                             <h6 class="title">Sadrzaji </h6>
                         </a> </header>
                     <div class="filter-content collapse" id="collapse_aside5" style="">
                         <div class="card-body"> 
							<label class="custom-control" v-for="amanity in activeAmenities"> 
								<input type="checkbox" v-bind:value="amanity.id" v-model="checkedAmanities" class="custom-control-input">
                                 <div class="custom-control-label">{{amanity.name}} </div>
                             </label> 
						
						</div>
                     </div>
                 </article>
             </div>
         </div>
     
 </div>
</div>
<div class="col ">
	<div class="flex-row">
	<button type="button pr-2" class="btn btn-primary  " v-on:click="sortPriceLH" > Cena rastuca </button>
	<button type="button" class="btn btn-primary " v-on:click="sortPriceHL" > Cena opadajuca </button>
	</div>
    <div class="card my-2 flex-row flex-wrap" v-for="(a,i) in filteredApartments" :key="keyI+i*100">	
        <div class="card-header border-0">
            <img v-bind:src="a.images[0]" alt="No image" v-if="a.images">
			<img src="resources/images/0.jpg" alt="No image"  v-else>
        </div>
		
		
        <div class="card-block px-2 col">
            <h4 class="card-title">{{a.name}}</h4>
            <p class="card-text">Cena: {{a.price}}</p>
			<p class="cart-text">Tip:{{a.type}}
			<div class="row">
			<span class="cart-text" v-for="aID in a.amenitiyIds" v-text="aID"></span>
            </div>
		</div>
				
		<div class="card-block px-2 d-flex align-items-end">
		<div >
				<router-link v-bind:to="'/apartment/'+a.id"> 	
            	<a class="btn btn-primary mb-2">Zakazivanje</a>
				</router-link>
            </div>
		</div>
		
        <div class="card-footer w-100 text-muted">
            Lokacija
        </div>

	</div>
    </div>
	</div>
	</div>
	</div>
	`
})