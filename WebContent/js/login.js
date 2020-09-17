var app = new Vue({

	el:'#login',
	data:{
		username:null,
		password:null,
		errors:[],
		hasErrors: false,
		hasRegisterErrors: false,
		user:null,
		info:null,
		register: false,
		registerUsername: '',
		registerPassword: '',
		registerRepeatedPassword: '',
		registerFirstName: '',
		registerLastName: '',
		registerGender: '',
		usernameError: false,
		passwordError: false,
		registerNameError: false,
		registerLastNameError: false,
		registerGenderError: false,
		registerUsernameError: false,
		registerPasswordError: false,
		registerRepeatedPasswordError: false,
		usernameTaken: false
		
	},
	methods:{
		checkForm: function(e){
			e.preventDefault();
			this.clearErrors();
			if(!this.username){
				this.hasErrors = true;
				this.usernameError = true;
			}
			if(!this.password){
				this.hasErrors = true;
				this.passwordError = true;
			}
			
			if(!this.hasErrors)
				axios
				.post('rest/login',{
					username:this.username,
					password:this.password
				})
				.then(response=>{
					window.location.href = '/apartmani-web';
					return true;
				})
				.catch(e=>{
					this.info=e.response.status;
					if(e.response.status==400){
						this.errors.push("Pogresno korisnicko ime/lozinka!");
					}
				})
			
		},
		checkRegisterForm: function (e) {
			e.preventDefault();
			this.clearErrors();
			if (!this.registerFirstName) {
				this.hasRegisterErrors = true;
				this.registerNameError = true;
			}
			if (!this.registerLastName) {
				this.hasRegisterErrors = true;
				this.registerLastNameError = true;
			}
			if (!this.registerGender) {
				this.hasRegisterErrors = true;
				this.registerGenderError = true;
			}
			if (!this.registerUsername) {
				this.hasRegisterErrors = true;
				this.registerUsernameError = true;
			}
			if (!this.registerPassword) {
				this.hasRegisterErrors = true;
				this.registerPasswordError = true;
			}
			if (this.registerRepeatedPassword != this.registerPassword) {
				this.hasRegisterErrors = true;
				this.registerRepeatedPasswordError = true;
			}
			
			if (!this.hasRegisterErrors)
				axios
					.post('rest/register', {
						username: this.registerUsername,
						password: this.registerPassword,
						firstName: this.registerFirstName,
						lastName: this.registerLastName,
						role: 'Guest',
						gender: this.registerGender,
						deleted:'false',
						blocked:'false'
					})
					.then(response => {
						window.location.href = '/apartmani-web/login.html';
						alert("Registracija uspesna.");
						return true;
					})
					.catch(e => {
						this.info = e.response.status;
						if (e.response.status == 400) {
							this.usernameTaken = true;
						}
					})
		},
		clearErrors: function () {
			this.errors = [];
			this.usernameTaken = false;
			this.hasErrors = false;
			this.hasRegisterErrors = false;
			this.usernameError = false;
			this.passwordError = false;
			this.registerGenderError = false;
			this.registerNameError = false;
			this.registerLastNameError = false;
			this.registerUsernameError = false;
			this.registerPasswordError = false;
			this.registerRepeatedPasswordError = false;
		}
	}
}
)
