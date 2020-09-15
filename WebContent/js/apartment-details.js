Vue.component('vue-ctk-date-time-picker', window['vue-ctk-date-time-picker']);
Vue.component('apartment-details',{
	data:function(){
		return{
			user: Object,
			apartment:Object,
			pictures:[],
			id:this.$route.params.id,
			showModal: false,
			datePicker:null,
			amenities:[],
			avaliableDatesMS:[],
			comments:[],
			apAmenities:[],
			userReservations:[]
			
		}
	},
	mounted() {
		this.user = app.user;
		axios
		.get('rest/apartments/search/'+this.id)
		.then(response => {
			this.apartment = response.data
			this.pictures=response.data.images
			this.comments=response.data.comments
			this.apAmenities=response.data.amenityIds
			this.avaliableDatesMS=response.data.availableDates
			});
		axios
		.get('rest/amenities/active')
		.then(response=>{
			this.amenities=response.data
		})
		axios
		.get('rest/reservations/guest/'+this.user.id)
		.then(response=>{
			this.userReservations=response.data
		})
		
	},
	
	computed:{
		apartmentAmenities(){
			return this.amenities.filter(a =>{
				if(this.apAmenities.includes(a.id)){
					return a
					}
			})
		},
		avaliableDates(){
			let ret=[]
			this.avaliableDatesMS.forEach(d=>{
				let date=new Date(d)
				var dd=date.getDate()
				if(dd<10){
						dd='0'+dd
					}
				var yyyy=date.getFullYear()
				var mm=date.getMonth()+1
				if(mm<10){
						mm='0'+mm
					}
				var dateFormat= yyyy+'-'+mm+'-'+dd
				ret.push(dateFormat)
			})
			return ret
		},
		minDate(){
			var today=new Date()
			var dd=today.getDate()
			var yyyy=today.getFullYear()
			var mm=today.getMonth()+1
			return yyyy+'-'+mm+'-'+dd
		},
		maxDate(){
			var today=new Date()
			var dd=today.getDate()
			var yyyy=today.getFullYear()+1
			var mm=today.getMonth()+1
			return yyyy+'-'+mm+'-'+dd
		},
		disabledDates(){
			var ret=[]
			var start=new Date(this.minDate)
			var end=new Date(this.maxDate)
			for(i=start;start<end;i.setDate(i.getDate()+1)){
				var dd=i.getDate()
					if(dd<10){
						dd='0'+dd
					}
					var yyyy=i.getFullYear()
					var mm=i.getMonth()+1
					if(mm<10){
						mm='0'+mm
					}
					var date= yyyy+'-'+mm+'-'+dd
				if(!this.avaliableDates.includes(date))
					ret.push(date)
			}
			return ret
		},
		commentsToDisplay(){
			if(this.user.role=="Admin" || this.user.role=="Host" ){
				return this.comments;
			}
			return this.comments.filter(c=>{
				if(c.toDisplay)
					return c
			});
		
		},
		allowComment(){
			if(this.user.role!='Guest')
				return false;
			this.userReservations.forEach(r=>{
				if(r.apartment==this.id){
					if(r.status=="rejected" || r.status=="finished")
					return true
				}
			})
			return false
		}
	},
	methods: {
		apartmentControl: function () {
			router.push('/apartment-control/' + this.apartment.id);
		},
		canEdit: function (){
			if (this.user.id == this.apartment.host || this.user.role == 'Admin') {
				return true;
			}
			return false;
		}
	},
	template:
  `
  
	<div>
      <h1 class="display3 text-center">Apartman</h1>
      <reservation-form v-bind:apartment="apartment" v-bind:minDate="minDate" v-bind:maxDate="maxDate" v-bind:disabledDates="disabledDates"  v-if="showModal" @close="showModal = false"></reservation-form>
      
      <!-- Dugme za prikaz forme za rezervaciju apartmana. Mozes ga premestati bilo gde po stranici -->
		<div v-if="user">
			<button class="btn btn-primary" @click="apartmentControl" v-if="canEdit()">Kontrolni panel</button>
      		<button class="btn btn-primary" id="show-modal" @click="showModal = true" v-if="user.role == 'Guest'">Rezervisi</button>
		</div>
      
      
      <div class="row">
        <div class="col">
          <div id="carouselExampleIndicators" class="carousel slide w-100 " data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" v-for="(img,index) in pictures" v-if="index>=1" v-bind:data-slide-to="index"></li>
            </ol>
            <div class="carousel-inner" >
				
              <div class="carousel-item active">
                <img class="d-block w-100 size" v-bind:src="pictures[0]" >
              </div>
			        <div class="carousel-item" v-for="(img,index) in pictures" v-if="index>=1"  >
                <img class="d-block w-100 size" v-bind:src="pictures[index]" >
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
        	<vue-ctk-date-time-picker label="Zeljeni datum" v-model="datePicker" :range="true" v-bind:disabled-dates="disabledDates" v-bind:min-date="minDate" v-bind:max-date="maxDate"  :no-shortcuts ="true">
          </vue-ctk-date-time-picker>
        </div>
      </div>
	<div id="amenities" class="container-fluid border border-primary rounded bg-secondary mt-2">
      <div class="row">
        <h5 class="text-light mx-2"><strong>Sadrzaji</strong></h5>
      </div>
		<div class="row">
		<button class="btn btn-primary mx-2 mb-2" v-for="a in apartmentAmenities">{{a.name}} </button>
		</div>
	</div>
	<comments class="my-4" v-bind:apartment="apartment" v-bind:comments="commentsToDisplay" v-bind:allowComment="allowComment" v-if=""></comments>

</div>

	`
})