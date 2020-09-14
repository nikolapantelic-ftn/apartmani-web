Vue.component("comments", {
	data: function() {
		return {
			user:app.user
		}
	},
	props:['comments'],
		
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
			<button class="btn btn-primary" v-if="!c.toDisplay && user.role==='Host'" >Prikazi komentar </button>
            </div>
        </div>
       

    </div>
</div>
<!--/.Comments-->
</div>

		`
})