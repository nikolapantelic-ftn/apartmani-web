Vue.component('users-view',{
	data:function(){
		return{
			currentUser:null,
			users:[],
			search:''
		}
	},
	beforeMount(){
		axios
		.post('rest/users/isAdmin')
		.then()
		.catch(e=>{
			if(e.response.status==403){
			this.$router.push('forbidden');	
			}
		})
	},
	mounted(){
		axios
		.get('rest/users')
		.then(response => (this.users = response.data))
	},
	computed: {
    filteredUsers() {
      return this.users.filter(user => {
       if(user.firstName.toLowerCase().match(this.search.toLowerCase())||user.lastName.toLowerCase().match(this.search.toLowerCase())|| user.username.toLowerCase().match(this.search.toLowerCase()))
		return user;
      })
    }
	},
	template:
  `
  
	<div class="container">
	<div class="row justify-content-around">
		<div class="col-4">
		 <div class="search-wrapper">
  		    <input type="text" v-model="search" placeholder="Pretraga korisnika "/>
  		</div>
		</div>
		<div class="col-4">
		<div class="col col-rg">
		<a href="#/addHost" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Dodaj domacina</a>
		</div>
		</div>
	</div>
	<div class="row">
	
      <div class="col-lg-3 col-md-4 col-sm-6" v-for="user in filteredUsers">
        <div class="panel panel-default userlist">
        
          <div class="panel-body text-center">
            <div class="userprofile">
              <div class="userpic"> <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="userpicimg"> </div>
              <h3 class="username">{{user.firstName}} {{user.lastName}}</h3>
            </div>
            <strong>{{user.role}}</strong><br>
            <p> 
            Korisnicko ime: {{user.username}}
            <br>
            E-mail: 
            </p>
          </div>
          <div class="panel-footer"> <a href="" class="btn btn-link">Deaktiviraj nalog</a> <a href="" class="btn btn-link pull-right favorite"><i class="fa fa-heart"></i></a> </div>
        </div>
      </div>
	</div>
	</div>
	</div>
	`
})