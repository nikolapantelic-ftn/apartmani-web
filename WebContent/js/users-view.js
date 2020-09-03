Vue.component('users-view',{
	data:function(){
		return{
			currentUser:null,
			users:[],
		}
	},
	mounted(){
		axios
		.get('rest/users')
		.then(response => (this.users = response.data))
	},
	template:
  `
  
	<div class="container">
	<div class="row">
	
      <div class="col-lg-3 col-md-4 col-sm-6" v-for="user in users">
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