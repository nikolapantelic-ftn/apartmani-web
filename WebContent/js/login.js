
var app = new Vue({

	el:'#login',
	data:{
		username:null,
		password:null,
		errors:[],
		user:null,
		info:null,
		register: false,
		
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
			
		}
	}
}
)
