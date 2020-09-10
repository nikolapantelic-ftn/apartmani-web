Vue.component('apartment-details',{
	data:function(){
		return{
			apartment:null,
			pictures:[],
			id:this.$route.params.id,
			showModal: false
		}
	},
	mounted(){
		axios
		.get('rest/apartments/search/'+this.id)
		.then(response => (this.apartment = response.data))
	},
	template:
  `
  
	<div>
      <h1 class="display3 text-center">Apartman</h1>
      <reservation-form v-if="showModal" @close="showModal = false"></reservation-form>
      
      <!-- Dugme za prikaz forme za rezervaciju apartmana. Mozes ga premestati bilo gde po stranici -->
      <button class="btn btn-primary" id="show-modal" @click="showModal = true">Rezervisi</button>
      
      
      <div class="row">
        <div class="col">
          <div id="carouselExampleIndicators" class="carousel slide w-100 " data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100 size" src="C:/Data/pictures/a1.jpg" alt="First slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100 size " src="C:/Data/pictures/a12.jpg" alt="Second slide">
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div class="col">
        	<div class="input-group date" data-provide="datepicker">
    <input type="text" class="form-control">
    <div class="input-group-addon">
        <span class="glyphicon glyphicon-th"></span>
    </div>
</div>
        </div>
      </div>
      <div class="row">
        <p>Sadrzaji</p>
      </div>
</div>

	`
})