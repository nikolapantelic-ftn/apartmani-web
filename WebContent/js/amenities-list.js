Vue.component('amenities-list',{
	data:function(){
		return{
			currentUser:null,
			amenities:[],
			search:'',
			name:'',
			checkedGender:['Male','Female'],
			checkedRole:['Admin','Guest','Host'],
			selected:'',
			newName:'',
			disabled:true
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
				name:this.name,
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
		selectAmanity:function(a){
			this.selected=a
			this.newName=''
		},
		
		updateAmenity:function(){
			axios
			.post('rest/amenities',{
				id:this.selected.id,
				name:this.newName,
			})
			.then(response=>{
				var index=this.amenities.findIndex(a => a.name === this.selected.name);
				this.amenities.splice(index, 1, response.data);
			})
			.catch(e=>{
				this.info=e.response.status;
				if(e.response.status==400){
					this.errors.push("Greska");
				}
			})
			
		},
		deleteAmenity:function(){
			axios
			.delete('rest/amenities/'+this.selected.id)
			.then(response=>{
				var index=this.amenities.findIndex(a => a.name === this.selected.name);
				var tmp=response.data
				this.amenities.splice(index, 1,tmp );
			})
			.catch(e=>{
				this.info=e.response.status;
				if(e.response.status==400){
					this.errors.push("Greska");
				}
			})
		},
		activateAmenity:function(a){
			this.selectAmanity(a)
			axios
			.post('rest/amenities',{
				id:a.id,
				name:a.name,
				deleted:'false'
			})
			.then(response=>{
				var index=this.amenities.findIndex(a => a.name === this.selected.name);
				this.amenities.splice(index, 1, response.data);
			})
			.catch(e=>{
				this.info=e.response.status;
				if(e.response.status==400){
					this.errors.push("Greska");
				}
			})
			
		}
		
		
	},
	template:
	`<div>
		<div class="container text-center">
			<div class="row">
				<label> Dodavanje sadrzaja </label>
			</div>
			<div class="row">
			<div class="col">
			<form>
 				 <div class="form-group">
   					<label>Naziv sadrzaja</label>
    				<input type="input" class="form-control" id="sadrzajNaziv" placeholder="Naziv" v-model="name">
    			</div>
			</form>
			</div>
			<div class="col">
				<button v-on:click="createAmanity" class="btn btn-primary btn-lg active"  aria-pressed="true">Potvrdi</button>
			</div>
  			</div>
		</div>
	
	<div class="row mx-5">
	<table class="table ">
  <thead>
    <tr>
      <th scope="col">IDa</th>
      <th scope="col">Naziv</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="a in amenities">
      <th scope="row">{{a.id}}</th>
      <td class="w-40">{{a.name}}</td>
	<td>
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal" v-on:click="selectAmanity(a)">
  										Izmeni
		</button>
	</td>
	<td>
		<button type="button" v-bind:disabled="a.deleted" class="btn btn-primary" data-toggle="modal" data-target="#deleteModal" v-on:click="selectAmanity(a)">
  										Obrisi
		</button>
	</td><td>
		<button type="button"  class="btn btn-primary" v-if="a.deleted" v-on:click="activateAmenity(a)">
  										Aktiviraj
		</button>
	</td>
    </tr>
  </tbody>
</table>
	</div>
	

<!-- Modal -->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Izmena sadrzaja {{selected.name}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
 				 <div class="form-group">
   					<label>Novi naziv sadrzaja</label>
    				<input type="input" class="form-control" id="sadrzajNaziv" placeholder="Naziv" v-model="newName">
    			</div>
			</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" v-on:click="updateAmenity" data-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Brisanje sadrzaja  {{selected.name}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" v-on:click="deleteAmenity" data-dismiss="modal">Obrisi</button>
      </div>
    </div>
  </div>
</div>
	</div>
	</div>
	
	`
	
	})