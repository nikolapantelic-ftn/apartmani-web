Vue.component('apartment-search',{
	data:function(){
		return{
			apartmentList:[]
		}
	},
	mounted(){
		axios
		.get('rest/apartments')
		.then(response => (this.apartmentList = response.data))
	},
	template:
	`
    <div class="card flex-row flex-wrap" v-for="a in apartmentList">
        <div class="card-header border-0">
            <img src="//placehold.it/200" alt="">
        </div>
        <div class="card-block px-2">
            <h4 class="card-title">{{a.name}}</h4>
            <p class="card-text">Cena: {{a.price}}</p>
            <a href="#" class="btn btn-primary">Zakazivanje</a>
        </div>
        <div class="w-100"></div>
        <div class="card-footer w-100 text-muted">
            Kontakt informacije
        </div>
    </div>

	`
})