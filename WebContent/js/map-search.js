Vue.component('map-search', {
	data: function () {
		return {
			apartments: [],
			longitude: 0,
			latitude: 0
		};
	},
	mounted: function () {
		var map = new ol.Map({
		        layers: [
		          new ol.layer.Tile({
		            source: new ol.source.OSM()
		          })
		        ],
		        controls: ol.control.defaults({
		          // Set to display OSM attributions on the bottom right control
		          attributionOptions:  {
		            collapsed: false
		          }
		        }).extend([
		          new ol.control.ScaleLine() // Add scale line to the defaults controls
		        ]),
		        target: 'map',
		        view: new ol.View({
		          center: ol.proj.fromLonLat([10, 0]),
		          zoom: 4
		        })
		      });
		map.on('click', event => {
			var lonlat = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
			this.longitude = lonlat[0];
			this.latitude = lonlat[1];
			axios
				.get('rest/apartments')
				.then(response => {
					this.apartments = response.data
						.filter(a => {
							if (a.status == 'inactive') return false;
							if (parseFloat(this.longitude) - 0.1 > parseFloat(a.location.longitude)) return false;
							if (parseFloat(this.longitude) + 0.1 < parseFloat(a.location.longitude)) return false;
							if (parseFloat(this.latitude) - 0.1 > parseFloat(a.location.latitude))return false;
							if (parseFloat(this.latitude) + 0.1 < parseFloat(a.location.latitude)) return false;
							return true;
						})
				})
		});
	},
	template:
		`
			<div class="container">
				<div id="map" class="map"></div>
				<div class="row d-flex justify-content-between">
		    		<apartment-item v-for="apartment in apartments" v-if="apartment.status == 'Active'" v-bind:key="apartment.id" :apartment="apartment" class="col-md-3 m-4">
		    		</apartment-item>
	    		</div>
			</div>
		`
})