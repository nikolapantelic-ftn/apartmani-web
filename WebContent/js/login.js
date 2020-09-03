var app = new Vue({

	el:'#login',
	data:{
		username:null,
		password:null,
		errors:[],
		user:null,
		info:null,
		register: false,
		registerUsername: '',
		registerPassword: '',
		registerRepeatedPassword: '',
		registerFirstName: '',
		registerLastName: '',
		registerGender: '',
		registerErrors: []
		
	},
	methods:{
		checkForm: function(e){
			this.errors = [];
			if(!this.username){
				this.errors.push("Korisnicko ime je obavezno!");
			}
			if(!this.password){
				this.errors.push("Lozinka je obavezna!");
			}
			e.preventDefault();
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
			this.errors = [];
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
				.post('rest/register', {
					username: this.registerUsername,
					password: this.registerPassword,
					firstName: this.registerFirstName,
					lastName: this.registerLastName,
					role: 'Guest',
					gender: this.registerGender
				})
				.then(response => {
					window.location.href = '/apartmani-web/login.html';
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
	}
}
)
