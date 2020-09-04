Vue.component('apartment-search',{
	data:function(){
		return{
			apartmentList:null,
			location:this.$route.query.location,
			startDate:this.$route.query.sDate,
			endDate:this.$route.query.eDate,
			guests:this.$route.query.guests,
			rooms:this.$route.query.rooms,
			cena:0,
			max:100,
			klima:'',
			tv:''
			
		}
	},
	mounted(){
		if(this.location==("")){
			this.location=" ";
		}
		axios
		.get('rest/apartments/searchF/'+this.location+'/'+this.rooms)
		.then(response => (this.apartmentList = response.data))
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
                     <header class="card-header"> <a href="#" data-toggle="collapse" data-target="#collapse_aside1" data-abc="true" aria-expanded="false" class="collapsed"> <i class="icon-control fa fa-chevron-down"></i>
                             <h6 class="title">Kategorija </h6>
                         </a> </header>
                     <div class="filter-content collapse" id="collapse_aside1" style="">
                         <div class="card-body">
                             <ul class="list-menu">
                                
                             </ul>
                         </div>
                     </div>
                 </article>
                 <article class="filter-group">
                     <header class="card-header"> <a href="#" data-toggle="collapse" data-target="#collapse_aside2" data-abc="true" aria-expanded="false" class="collapsed"> <i class="icon-control fa fa-chevron-down"></i>
                             <h6 class="title">Cena </h6>
                         </a> </header>
                     <div class="filter-content collapse" id="collapse_aside2" style="">
                         <div class="card-body"> <input type="range" class="custom-range" v-model="cena" min="0" v-bind:max="max" name="">
                             <div class="form-row">
                                 <div class="form-group col-md-6"> <label>Min</label> <input class="form-control" placeholder="$0" v-model="cena" type="number"> </div>
                                 <div class="form-group text-right col-md-6"> <label>Max</label> <input class="form-control" v-model="max" placeholder="$1,0000" type="number"> </div>
                             </div> <a href="#" class="highlight-button btn btn-medium button xs-margin-bottom-five" data-abc="true">Potvrdi</a>
                         </div>
                     </div>
                 </article>
                 <article class="filter-group">
                     <header class="card-header"> <a href="#" data-toggle="collapse" data-target="#collapse_aside3" data-abc="true" aria-expanded="false" class="collapsed"> <i class="icon-control fa fa-chevron-down"></i>
                             <h6 class="title">Broj soba </h6>
                         </a> </header>
                     <div class="filter-content collapse" id="collapse_aside3" style="">
                         <div class="card-body">
						 <select class="form-control  text-center" v-model="rooms" >
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
							<label class="custom-control"> <input type="checkbox" v-model="tv" class="custom-control-input">
                                 <div class="custom-control-label">TV </div>
                             </label> 
							<label class="custom-control"> <input type="checkbox"  v-model="klima" class="custom-control-input">
                                 <div class="custom-control-label">Klima </div>
                             </label>
						</div>
                     </div>
                 </article>
             </div>
         </div>
     
 </div>
</div>
<div class="col">
    <div class="card  flex-row flex-wrap" v-for="a in apartmentList">	
        <div class="card-header border-0">
            <img src="//placehold.it/200" alt="">
        </div>
        <div class="card-block px-2">
            <h4 class="card-title">{{a.name}}</h4>
            <p class="card-text">Cena: {{a.price}}</p>
            
        </div>
		<div class="card-block px-2">
		<div class="text-right">
				<router-link v-bind:to="'/apartment/'+a.id"> 	
            	<a class="btn btn-primary">Zakazivanje</a>
				</router-link>
            </div>
		</div>
        <div class="w-100"></div>
        <div class="card-footer w-100 text-muted">
            Kontakt informacije:
        </div>
	</div>
    </div>
	</div>
	</div>
	`
})