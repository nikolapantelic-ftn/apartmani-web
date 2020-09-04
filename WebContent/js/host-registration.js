Vue.component("host-registration",{
	data:function(){
		return{
			registerUsername: '',
			registerPassword: '',
			registerRepeatedPassword: '',
			registerFirstName: '',
			registerLastName: '',
			registerGender: '',
			registerErrors: []
		}
	},
	methods:{
		checkRegisterForm: function (e) {
			if (!this.registerFirstName) {
				this.registerErrors.push("Ime je obavezno!");
			}
			if (!this.registerPassword) {
				this.registerErrors.push("Prezime je obavezno!");
			}
			if (!this.registerUsername) {
				this.registerErrors.push("Korisnicko ime je obavezno!");
			}
			if (!this.registerPassword) {
				this.registerErrors.push("Lozinka je obavezna!");
			}
			if (this.registerRepeatedPassword != this.registerPassword) {
				this.registerErrors.push("Lozinke se ne poklapaju!");
			}
			e.preventDefault();
			
			axios
				.post('rest/register/host', {
					username: this.registerUsername,
					password: this.registerPassword,
					firstName: this.registerFirstName,
					lastName: this.registerLastName,
					role: 'Host',
					gender: this.registerGender
				})
				.then(response => {
					window.location.href = '/apartmani-web/#/users';
					alert("Registracija uspesna.");
					return true;
				})
				.catch(e => {
					this.info = e.response.status;
					if (e.response.status == 400) {
						this.registerErrors.push("Korisnicko ime je zauzeto!");
					}
				})
		}
	},
	template:
	`<div>
		<div class="d-inline d-flex justify-content-center">
	    <form method="post" @submit="checkRegisterForm" name="register" id="register-form" class="col-sm-6 border border-light mt-1">
	    	<p v-if="registerErrors.length">
				<b>{{registerErrors[0]}}</b>
			</p>
	    	<div class="form-group row">
	    		<div class="col">
	    			<input type="text" v-model='registerFirstName' class="form-control" id="name-input" placeholder="Ime">
	    		</div>
	    		<div class="col">
	    			<input type="text" v-model='registerLastName' class="form-control" id="last-name-input" placeholder="Prezime">
	    		</div>
	    	</div>
	    	<div class="form-group">
	    		<label for="gender">Pol</label>
	    		<div id="gender">
	    			<div class="form-check form-check-inline">
			    		<input class="form-check-input" v-model='registerGender' type="radio" id="male" name="gender" value="Male">
		                <label class="form-check-label" for="male">Muški</label>
	                </div>
	                <div class="form-check form-check-inline">
		                <input class="form-check-input" v-model='registerGender' type="radio" id="female" name="gender" value="Female">
		                <label class="form-check-label" for="female">Ženski</label>
	                </div>
                </div> 	
	    	</div>
	    	<div class="form-group">
	    		<input type="text" v-model='registerUsername' class="form-control" id="username-input" placeholder="Korisničko ime"/>
	    	</div>
	    	<div class="form-group">
	    		<input type="password" v-model='registerPassword' class="form-control" id="password-input" placeholder="Lozinka"/>
	    	</div>
	    	<div class="form-group">
	    		<input type="password" v-model='registerRepeatedPassword' class="form-control" id="repeated-password-input" placeholder="Ponovljena lozinka"/>
	    	</div>
	    	<button type="submit" class="btn btn-default">Registruj domacina</button>
	    </form>
		</div>
		</div>
	`	
	
})