Vue.component('vue-ctk-date-time-picker', window['vue-ctk-date-time-picker']);
Vue.component('apartment-details',{
	data:function(){
		return{
			user: Object,
			apartment:Object,
			pictures:[],
			id:this.$route.params.id,
			showModal: false,
			showDeleteModal: false,
			datePicker:null,
			amenities:[],
			avaliableDatesMS:[],
			comments:[],
			apAmenities:[],
			userReservations:[],
			format:'YYYY-MM-DD',
			location:Object
			
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
			this.location=response.data.location
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
		axios
		.get('rest/reservations/apartment/'+this.id+'/free-dates')
		.then(response=>{
			this.avaliableDatesMS=response.data
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
			var user=true
			var ret=false
			if(this.user.role!='Guest')
				user=false;
			this.userReservations.forEach(r=>{
				if(r.apartment==this.apartment.id){
					if(r.status=="rejected" || r.status=="finished")
					ret=true
				}
			})
			return user&&ret
		},
		apartmentType(){
			if(this.apartment.type=="room")
				return "Soba"
			return "Ceo apartman"
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
		},
		setActive: function () {
			axios
				.get('rest/apartments/set-active/' + this.id)
				.then(response => {
					this.apartment.status = 'Active';
					alert('Apartman aktiviran.')
				})
				.catch(e => alert('Neuspesno aktiviranje.'));
		},
		setInactive: function () {
			axios
				.get('rest/apartments/set-inactive/' + this.id)
				.then(response => {
					this.apartment.status = 'Inactive';
					alert('Apartman deaktiviran.')
				})
				.catch(e => alert('Neuspesno deaktiviranje.'));
		},
		deleteApartment: function () {
			axios
				.delete('rest/apartments/' + this.id)
				.then(response => {
					alert('Apartman obrisan.');
					router.push('/');
				})
				.catch(e => {
					alert("Greska u brisanju apartmana");
					console.log(e);
				})
		}
	},
	template:
  `
  
	<div>
	<div class="d-flex justify-content-around">
      <h1 class="display3 text-center">{{apartment.name}}</h1>
      <reservation-form v-bind:apartment="apartment" v-bind:minDate="minDate" v-bind:maxDate="maxDate" v-bind:disabledDates="disabledDates"  v-if="showModal" @close="showModal = false"></reservation-form>
		<div v-if="user">
			<button class="btn btn-primary" @click="apartmentControl" v-if="canEdit()">Kontrolni panel</button>
      		<button class="btn btn-primary" id="show-modal" @click="showModal = true" v-if="user.role == 'Guest'">Rezervisi</button>
			<button class="btn btn-success" @click="setActive" v-if="user.role == 'Admin' && apartment.status == 'Inactive'">Aktiviraj</button>
			<button class="btn btn-danger" @click="setInactive" v-if="user.role == 'Admin' && apartment.status == 'Active'">Deaktiviraj</button>
			<button class="btn btn-danger" @click="showDeleteModal = true" v-if="canEdit()">Obrisi apartman</button>
		</div>
      </div>
		<transition name="modal" v-if="showDeleteModal">
	    	<div class="modal-mask">
				<div class="modal-wrapper">
					<div class="modal-container">
	
						<div class="modal-header d-flex justify-content-center">
							<h6 class="">Da li ste sigurni da zelite da obrisete apartman?</h6>
						</div>
						<div class="modal-body d-flex justify-content-center">
							<button class="btn btn-danger m-2" @click="deleteApartment">Obrisi apartman</button>
							<button class="btn btn-secondary m-2" @click="showDeleteModal = false">Otkazi</button>
						</div>
					</div>
				</div>
			</div>
		</transition>
      
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
        	<vue-ctk-date-time-picker label="Slobodni datumi" v-model="datePicker" v-bind:format="format" :only-date="true" v-bind:disabled-dates="disabledDates" v-bind:min-date="minDate" v-bind:max-date="maxDate"  :no-shortcuts ="true">
          </vue-ctk-date-time-picker>
			 <h4>Cena:<span class="badge badge-primary"> {{apartment.price}}</span></h4>
			<h4>Mesto:<span class="badge badge-primary"> {{location.address.place}}</span></h4>
			<h4>Adresa:<span class="badge badge-primary"> {{location.address.streetAndNumber}}</span></h4>
			<h4>Broj soba:<span class="badge badge-primary"> {{apartment.numberOfRooms}}</span></h4>
			<h4>Broj gostiju:<span class="badge badge-primary"> {{apartment.numberOfGuests}}</span></h4>
			<h4>Tip:<span class="badge badge-primary"> {{apartmentType}}</span></h4>
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