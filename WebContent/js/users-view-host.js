Vue.component('users-view-host', {
	data: function () {
		return {
			guests: [],
			search: ''
		};
	},
	mounted: function () {
		axios
			.get('rest/guests/host/' + app.user.id)
			.then(response => (this.guests = response.data));
	},
	computed: {
		filteredGuests() {
			return this.guests.filter(guest => {
				let name = guest.firstName + ' ' + guest.lastName;
				if (name.toLowerCase().includes(this.search.toLowerCase()) ||
					guest.username.toLowerCase().includes(this.search.toLowerCase())) return true;
				else return false;
			})
		}
	},
	template:
		`
			<div class="container">
				<h3 class="d-flex justify-content-center">Moji gosti</h3>
					<div class="col mb-3">
						<div class="search-wrapper ">
			  				<input type="text" v-model="search" placeholder="Pretraga korisnika "/>
						</div>
					</div>
				<div class="row">
					<div class="col-lg-3 col-md-4 col-sm-6" v-for="user in filteredGuests">
						<div class="panel panel-default userlist">
							<div class="panel-body text-center">
								<div class="userprofile">
									<div class="userpic"> <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="userpicimg"> </div>
										<h3 class="username">{{user.firstName}} {{user.lastName}}</h3>
									</div>
									<strong>{{user.role}}</strong><br>
									<p> 
										Korisnicko ime: {{user.username}}
									</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`
})