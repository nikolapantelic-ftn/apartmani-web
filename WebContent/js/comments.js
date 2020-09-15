Vue.component("comments", {
	data: function() {
		return {
			user:app.user,
			newComment:{
				text:'',
				mark:0,
				guest:{username:app.user.username},
				toDisplay:false
			}
		}
	},
	props:['comments','allowComment','apartment'],
	
	methods:{
		displayComment(c){
			c.toDisplay=true;
			
		},
		showComment(c){
			c.toDisplay=true
			axios
				.post('rest/apartments', this.apartment)
				.then(response => {
					alert('Komentar postavljen');
				})
				.catch(e => {
					console.log(e.response.data)
				})
			
		},
		hideComment(c){
			c.toDisplay=false
			axios
				.post('rest/apartments', this.apartment)
				.then(response => {
					alert('Komentar postavljen');
				})
				.catch(e => {
					console.log(e.response.data)
				})
			
		},
		postComment(){
			this.apartment.comments.push(this.newComment)
			axios
				.post('rest/apartments', this.apartment)
				.then(response => {
					alert('Komentar postavljen');
				})
				.catch(e => {
					console.log(e.response.data)
				})
				
		}
	},
	computed:{
		isOwner(){
			if(this.apartment.host==this.user.username)
				return true
			return false
		}
	},
		
	template:
		`
	<!--Comments-->
	<div>
<div class="card card-comments mb-3 wow fadeIn">
    <div class="card-header font-weight-bold">Komentari</div>
    <div class="card-body">

        <div class="media d-block d-md-flex mt-4" v-for="c in comments">
            <img class="d-flex mb-3 mx-auto " src="https://mdbootstrap.com/img/Photos/Avatars/img (20).jpg" alt="Generic placeholder image">
            <div class="media-body text-center text-md-left ml-md-3 ml-0">
                <h5 class="mt-0 font-weight-bold"> {{c.guest.username}}
                    <a href="" class="pull-right">
                        <i class="fa fa-reply"></i>
                    </a>
                </h5>
                {{c.text}}
			<star-rating v-model="c.mark" :read-only="true"></star-rating>
			<button class="btn btn-primary" v-if="!c.toDisplay && isOwner" v-on:click="showComment(c)" >Prikazi komentar </button>
			<button class="btn btn-primary" v-if="c.toDisplay && isOwner" v-on:click="hideComment(c)" >Sakrij komentar </button>
            </div>
        </div>
       

    </div>
</div>
<!--/.Comments-->
<div class="card mb-3 wow fadeIn" v-if="allowComment">
    <div class="card-header font-weight-bold">Ostavite utisak</div>
    <div class="card-body">

        <!-- Default form reply -->
        <form>

            <!-- Comment -->
            <div class="form-group">
                <label for="replyFormComment">Vas komentar</label>
                <textarea class="form-control" id="replyFormComment" v-model="newComment.text" rows="5"></textarea>
            </div>
			<div>
			<star-rating v-model="newComment.mark"></star-rating>
            </div>
			<div class="text-center mt-4">
                <button class="btn btn-info btn-md" v-on:click="postComment">Dodaj komentar</button>
            </div>
			
        </form>
        <!-- Default form reply -->



    </div>
</div>
</div>

		`
})