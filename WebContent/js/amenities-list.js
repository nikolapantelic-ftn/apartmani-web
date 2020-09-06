Vue.component('amenities-list',{
	data:function(){
		return{
			currentUser:null,
			amenities:[],
			search:'',
			name:'',
			tableKey:0,
			checkedGender:['Male','Female'],
			checkedRole:['Admin','Guest','Host'],
			test:[]
		}
	},
	beforeMount(){
		axios
		.post('rest/users/isAdmin')
		.then()
		.catch(e=>{
			if(e.response.status==403){
			//this.$router.push('forbidden');	
			}
		})
	},
	mounted(){
		axios
		.get('rest/amenities')
		.then(response => (this.amenities = response.data))
	},
	methods:{
		createAmanity :function(){
			axios
			.post('rest/amenities',{
				naziv:this.name,
			})
			.then(response=>{
				this.amenities.push(response.data)
			})
			.catch(e=>{
				this.info=e.response.status;
				if(e.response.status==400){
					this.errors.push("Greska");
				}
			})
			
			
		},
		
	},
	template:
	`<div>
		<div class="container">
			<div class="row">
				<label> Dodavanje sadrzaja </label>
			</div>
			<div class="row">
			<div class="col">
			<form>
 				 <div class="form-group">
   					<label for="exampleInputEmail1">Naziv sadrzaja</label>
    				<input type="input" class="form-control" id="sadrzajNaziv" placeholder="Naziv" v-model="name">
    			</div>
			</form>
			</div>
			<div class="col">
				<button v-on:click="createAmanity" class="btn btn-primary btn-lg active"  aria-pressed="true">Potvrdi</button>
			</div>
  			</div>
		</div>
	
	<div class="row flex ">
	<table class="table" :key="tableKey">
  <thead>
    <tr>
      <th scope="col">IDa</th>
      <th scope="col">Naziv</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="a in amenities">
      <th scope="row">{{a.id}}</th>
      <td>{{a.naziv}}</td>
    </tr>
  </tbody>
</table>
	</div>
	</div>
	</div>
	
	`
	
	})