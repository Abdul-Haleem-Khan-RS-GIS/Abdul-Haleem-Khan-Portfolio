// Mapbox Interactive Map
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
const map = new mapboxgl.Map({
  container: 'mapid',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [36.8, 31.95],
  zoom: 8
});

// Load projects from CSV
Papa.parse('projects.csv', {
  download: true,
  header: true,
  complete: function(results){
    const container = document.getElementById('projects-container');
    results.data.forEach(p => {
      if(!p.Title) return;
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<h3>${p.Title}</h3>
                       <p><strong>Tools:</strong> ${p.Tools}</p>
                       <p>${p.Description}</p>
                       <img src="${p.Image}" alt="${p.Title}">`;
      container.appendChild(div);

      // Add points on map (optional)
      if(p.Lat && p.Lon){
        new mapboxgl.Marker()
          .setLngLat([parseFloat(p.Lon), parseFloat(p.Lat)])
          .setPopup(new mapboxgl.Popup().setHTML(`<strong>${p.Title}</strong>`))
          .addTo(map);
      }
    });
  }
});
