Vue.component("booking-form",{
	data:function(){
		return{
			guests:1,
			children:0,
			startDate:null,
			endDate:null,
			search:""
		}
	},
	template:
	`
		<div class="section-center">
			<div class="container">
				<div class="row">
					<div class="booking-form">
						<form>
							<div class="col-md-8">
								<div class="form-group">
									<input class="form-control" v-model="search" type="text" placeholder="Unesite destinaciju">
									<span class="form-label">Destinacija</span>
								</div>
							</div>
							<div class="col-md-2">
								<div class="form-group">
									<select class="form-control" v-model="guests">
										<option>1</option>
										<option>2</option>
										<option>3</option>
									</select>
									<span class="select-arrow"></span>
									<span class="form-label">Gosti</span>
								</div>
							</div>
							<div class="col-md-2">
								<div class="form-group">
									<select class="form-control" v-model='children'>
										<option>0</option>
										<option>1</option>
										<option>2</option>
									</select>
									<span class="select-arrow"></span>
									<span class="form-label">Deca</span>
								</div>
							</div>
							<div class="col-md-4">
								<div class="form-group">
									<input class="form-control" type="date" required v-model='startDate'>
									<span class="form-label">Datum prijave</span>
								</div>
							</div>
							<div class="col-md-4">
								<div class="form-group">
									<input class="form-control" type="date" required v-model="endDate">
									<span class="form-label">Datum odjave</span>
								</div>
							</div>
							<div class="col-md-4">
								<div class="form-btn">
									<button class="submit-btn">Proveri raspolozivost</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	`	
	
})