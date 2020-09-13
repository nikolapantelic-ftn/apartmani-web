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
			errors: []
		}
	},
	methods: {
		edit: function () {
			this.editMode = true;
		},
		cancel: function () {
			this.errors = [];
			this.editMode = false;
			this.firstName = this.user.firstName;
			this.lastName = this.user.lastName;
			this.gender = this.user.gender;
			this.password = '';
			this.repeatedPassword = '';
		},
		submit: function () {
			this.errors = [];
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
				.then(this.editMode = false)
				.catch(error => (console.log(error.response)))
		},
		changePassword: function () {
			this.errors = [];
			if (this.password.length == 0) return;
			if (this.password != this.repeatedPassword) {
				this.errors.push('Lozinke se ne poklapaju!')
				return;
			}
			this.user.password = this.password;
			let servicePath = '/guest-profile';
			if (this.user.role == 'Host') servicePath = '/host-profile';
			else if (this.user.role == 'Admin') servicePath = '/admin-profile';
			axios
				.post('rest/users' + servicePath, this.user)
				.then(this.editMode = false)
				.catch(error => (console.log(error.response)));
			this.password = '';
			this.repeatedPassword = '';
		}
	},
	template: 
		`
			<div class="container">
				<h2>Pregled profila</h2>
				<div class="form-row">
					<div class="form-group col-md-5">
						<label for="first-name">Ime:</label>
						<input type="text" class="form-control" id="first-name" v-model="firstName" v-if="editMode">
						<input type="text" class="form-control" id="first-name" v-model="firstName" disabled v-else>
					</div>
					<div class="form-group col-md-5">
						<label for="last-name">Prezime:</label>
						<input type="text" class="form-control" id="last-name" v-model="lastName" v-if="editMode">
						<input type="text" class="form-control" id="last-name" v-model="lastName" disabled v-else>
					</div>
				</div>
				<div class="form-row">
					<div class="form-group">
						<label for="gender">Pol:</label>
			    		<div id="gender" v-if="editMode">
			    			<div class="form-check form-check-inline">
					    		<input class="form-check-input" v-model="gender" type="radio" id="male" name="gender" value="Male">
				                <label class="form-check-label" for="male">Muški</label>
			                </div>
			                <div class="form-check form-check-inline">
				                <input class="form-check-input" v-model="gender" type="radio" id="female" name="gender" value="Female">
				                <label class="form-check-label" for="female">Ženski</label>
			                </div>
		                </div>
						<div class="ml-2" id="gender" v-else>
							<div v-if="gender == 'Male'">Muski</div>
							<div v-if="gender == 'Female'">Zenski</div>
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
						<input type="password" class="form-control" id="password" v-model="password" v-if="editMode">
					</div>
					<div class="form-group col-md-5">
						<label for="repeated-password">Ponovljena lozinka:</label>
						<input type="password" class="form-control" id="repeated-password" v-model="repeatedPassword" v-if="editMode">
					</div>
				</div>
				<button class="btn btn-warning" v-if="editMode" @click="changePassword">Izmeni lozinku</button>
				<div v-if="errors.length">{{ errors[0] }}</div>
			</div>
		`
})