Vue.component('profile-view', {
	data: function () {
		return {
			user: app.user,
			firstName: app.user.firstName,
			lastName: app.user.lastName,
			gender: app.user.gender,
			password: '',
			repeatedPassword: '',
			editMode: false,
			hasErrors: false,
			nameError: false,
			lastNameError: false,
			passwordError: false,
			repeatedPasswordError: false
		}
	},
	methods: {
		edit: function () {
			this.editMode = true;
		},
		cancel: function () {
			this.clearErrors();
			this.editMode = false;
			this.firstName = this.user.firstName;
			this.lastName = this.user.lastName;
			this.gender = this.user.gender;
			this.password = '';
			this.repeatedPassword = '';
		},
		submit: function () {
			this.checkForm();
			if (this.hasErrors) return;
			this.user.firstName = this.firstName;
			this.user.lastName = this.lastName;
			this.user.gender = this.gender;
			this.password = '';
			this.repeatedPassword = '';
			let servicePath = '/guest-profile'
			if (this.user.role == 'Host') servicePath = '/host-profile';
			else if (this.user.role == 'Admin') servicePath = '/admin-profile';
			axios
				.post('rest/users' + servicePath, this.user)
				.then(response => {
					this.editMode = false;this.hasErrors = true;
					alert("Uspesno izmenjen profil.");
					})
				.catch(error => {
					console.log(error.response);
					alert("Greska pri izmeni profila.");
				});
		},
		changePassword: function () {
			this.checkPasswordForm();
			if (this.hasErrors) return;
			this.user.password = this.password;
			let servicePath = '/guest-profile';
			if (this.user.role == 'Host') servicePath = '/host-profile';
			else if (this.user.role == 'Admin') servicePath = '/admin-profile';
			axios
				.post('rest/users' + servicePath, this.user)
				.then(response => {
					this.editMode = false;
					alert("Uspesno izmenjena lozinka.");
					})
				.catch(error => {
					console.log(error.response);
					alert("Greska pri izmeni lozinke.");
				});
			this.password = '';
			this.repeatedPassword = '';
		},
		checkForm: function () {
			this.clearErrors();
			if (!this.firstName) {
				this.hasErrors = true;
				this.nameError = true;
			}
			if (!this.lastName) {
				this.hasErrors = true;
				this.lastNameError = true;
			}
		},
		checkPasswordForm: function () {
			this.clearErrors();
			if (!this.password) {
				this.hasErrors = true;
				this.passwordError = true;
			}
			if (this.repeatedPassword != this.password) {
				this.hasErrors = true;
				this.repeatedPasswordError = true;
			}
		},
		clearErrors: function () {
			this.hasErrors = false;
			this.nameError = false;
			this.lastNameError = false;
			this.passwordError = false;
			this.repeatedPasswordError = false;
		}
	},
	template: 
		`
			<div class="container">
				<h2>Pregled profila</h2>
				<div class="form-row">
					<div class="form-group col-md-5">
						<label for="first-name">Ime:</label>
						<input type="text" class="form-control" v-bind:class="{ 'is-invalid': nameError }" id="first-name" v-model="firstName" :disabled="editMode == false">
						<div class="invalid-feedback" v-if="nameError">
		    				Ime je obavezno.
		    			</div>
					</div>
					<div class="form-group col-md-5">
						<label for="last-name">Prezime:</label>
						<input type="text" class="form-control" v-bind:class="{ 'is-invalid': lastNameError }" id="last-name" v-model="lastName" :disabled="editMode == false">
						<div class="invalid-feedback" v-if="lastNameError">
		    				Prezime je obavezno.
		    			</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-group">
						<label for="gender">Pol:</label>
			    		<div id="gender">
			    			<div class="form-check form-check-inline">
					    		<input class="form-check-input" v-model="gender" type="radio" id="male" name="gender" value="Male" :disabled="editMode == false">
				                <label class="form-check-label" for="male">Muški</label>
			                </div>
			                <div class="form-check form-check-inline">
				                <input class="form-check-input" v-model="gender" type="radio" id="female" name="gender" value="Female" :disabled="editMode == false">
				                <label class="form-check-label" for="female">Ženski</label>
			                </div>
		                </div>
					</div>
				</div>
				<button class="btn btn-primary" @click="edit" v-if="!editMode">Izmeni profil</button>
				<div v-else>
					<button class="btn btn-success" @click="submit">Sacuvaj izmene</button>
					<button class="btn btn-secondary" @click="cancel">Odustani</button>
				</div>
				<div class="form-row mt-5" v-if="editMode">
					<div class="form-group col-md-5">
						<label for="password">Nova lozinka:</label>
						<input type="password" class="form-control" v-bind:class="{ 'is-invalid': passwordError }" id="password" v-model="password" v-if="editMode">
						<div class="invalid-feedback" v-if="passwordError">
		    				Lozinka ne sme biti prazna.
		    			</div>
					</div>
					<div class="form-group col-md-5">
						<label for="repeated-password">Ponovljena lozinka:</label>
						<input type="password" class="form-control" v-bind:class="{ 'is-invalid': repeatedPasswordError }" id="repeated-password" v-model="repeatedPassword" v-if="editMode">
						<div class="invalid-feedback" v-if="repeatedPasswordError">
		    				Lozinke se ne poklapaju.
		    			</div>
					</div>
				</div>
				<button class="btn btn-warning" v-if="editMode" @click="changePassword">Izmeni lozinku</button>
			</div>
		`
})