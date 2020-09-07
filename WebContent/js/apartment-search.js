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
			max:100,
			amenities:[],
			checkedAmanities:[]
			
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
			apartment.amenities.forEach(am=>{
				if(am.name==a){
					return true;
				}
			})
		})
		return false;
	},
    filteredApartments() {
      return this.apartmentList.filter(apartment => {
		var appAmenities=[];
		apartment.amenities.forEach(a=>{
			appAmenities.push(a.name);
		})
		var hasAmenities=true;
		
		this.checkedAmanities.forEach(a=>{
			if(!appAmenities.includes(a))
			hasAmenities=false;
		})
       if(apartment.price<=this.max && apartment.price>=this.min && hasAmenities)
		return apartment;
      })

    
	}
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
							<label class="custom-control" v-for="amanity in amenities"> 
								<input type="checkbox" v-bind:value="amanity.name" v-model="checkedAmanities" class="custom-control-input">
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
    <div class="card mb-2 flex-row flex-wrap" v-for="a in filteredApartments">	
        <div class="card-header border-0">
            <img src="//placehold.it/200" alt="">
        </div>
		
		
        <div class="card-block px-2 col">
            <h4 class="card-title">{{a.name}}</h4>
            <p class="card-text">Cena: {{a.price}}</p>
            
        </div>
		
		
		<div class="card-block px-2 col" v-for="amenity in a.amenities" >
            <p class="card-text">{{amenity.name}}</p>
            
        </div>
		
		
		<div class="card-block px-2">
		<div class="text-right">
				<router-link v-bind:to="'/apartment/'+a.id"> 	
            	<a class="btn btn-primary">Zakazivanje</a>
				</router-link>
            </div>
		</div>
		
        <div class="card-footer w-100 text-muted">
            Kontakt informacije:
        </div>

	</div>
    </div>
	</div>
	</div>
	</div>
	`
})