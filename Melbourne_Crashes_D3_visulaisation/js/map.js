        var map = L.map('map').setView([-37.77012, 145.02671999999998], 9);
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            max20oom: 18,
            }).addTo(map);
				
	/* Initialize the SVG layer */
	map._initPathRoot()    

	/* We simply pick up the SVG from the map object */
	var svg = d3.select("#map").select("svg"),
	g = svg.append("g");
	
	d3.json("data/map.geojson", function(collection) {
        console.log(collection)
		/* Add a LatLng object to each item in the dataset */
		collection.objects.forEach(function(d) {
			d.LatLng = new L.LatLng(d.circle.coordinates[0],
									d.circle.coordinates[1])
		})
		
		var feature = g.selectAll("circle")
			.data(collection.objects)
			.enter().append("circle")
			.style("stroke", "black")  
			.style("opacity", .6) 
			.style("fill", "red")
			.attr("r", 3);  
		
		map.on("viewreset", update);
		update();

		function update() {
			feature.attr("transform", 
			function(d) { 
				return "translate("+ 
					map.latLngToLayerPoint(d.LatLng).x +","+ 
					map.latLngToLayerPoint(d.LatLng).y +")";
				}
			)
		}
	})	