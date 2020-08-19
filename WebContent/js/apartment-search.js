Vue.component('apartment-search',{
	data:function(){
		return{
			apartmentList:null,
			location:this.$route.query.location,
			startDate:this.$route.query.sDate,
			endDate:this.$route.query.eDate,
			guests:this.$route.query.guests,
			rooms:this.$route.query.rooms
			
		}
	},
	mounted(){
		if(this.location==("")){
			this.location=" ";
		}
		alert(this.location);
		axios
		.get('rest/apartments/searchF/'+this.location+'/'+this.rooms)
		.then(response => (this.apartmentList = response.data))
	},
	template:
	`
	<div >
    <div class="card flex-row flex-wrap" v-for="a in apartmentList">	
        <div class="card-header border-0">
            <img src="//placehold.it/200" alt="">
        </div>
        <div class="card-block px-2">
            <h4 class="card-title">{{a.name}}</h4>
            <p class="card-text">Cena: {{a.price}}</p>
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

	`
})