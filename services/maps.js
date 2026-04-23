// ElectAssist — Google Maps Service
// Handles polling booth locator via Google Maps JS API + Places API

class MapsService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.map = null;
    this.markers = [];
    this.infoWindows = [];
    this.isLoaded = false;
  }

  // Dynamically load Google Maps script
  loadMapsAPI() {
    return new Promise((resolve, reject) => {
      if (this.isLoaded || window.google?.maps) {
        this.isLoaded = true;
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.isLoaded = true;
        resolve();
      };
      script.onerror = () => reject(new Error("Failed to load Google Maps"));
      document.head.appendChild(script);
    });
  }

  // Initialize map in given container
  async initMap(containerId, center = { lat: 28.6139, lng: 77.2090 }) {
    await this.loadMapsAPI();

    this.map = new window.google.maps.Map(document.getElementById(containerId), {
      center,
      zoom: 13,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#1a1a2e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a2e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#a0a0b0" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#2d2d4e" }] },
        { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212121" }] },
        { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3d3d6e" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#0d0d1a" }] },
        { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#1a2e1a" }] },
        { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true
    });

    return this.map;
  }

  // Search for polling stations near a location (FR-11, FR-12)
  async findNearbyBoothsText(address) {
    await this.loadMapsAPI();

    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status !== "OK" || !results.length) {
          reject(new Error("Location not found. Please try a more specific address."));
          return;
        }

        const location = results[0].geometry.location;
        if (this.map) {
          this.map.setCenter(location);
          this.map.setZoom(14);
        }

        const service = new window.google.maps.places.PlacesService(
          this.map || document.createElement("div")
        );

        const request = {
          location,
          radius: 3000,
          keyword: "polling booth government school election",
          type: ["school", "local_government_office", "city_hall"]
        };

        service.nearbySearch(request, (places, searchStatus) => {
          if (searchStatus === window.google.maps.places.PlacesServiceStatus.OK && places.length) {
            this.clearMarkers();
            const booths = places.slice(0, 5).map((place, i) => ({
              id: `booth_${i}`,
              name: place.name,
              address: place.vicinity,
              location: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              },
              placeId: place.place_id,
              distance: this.calculateDistance(
                location.lat(), location.lng(),
                place.geometry.location.lat(), place.geometry.location.lng()
              )
            }));

            booths.sort((a, b) => a.distance - b.distance);
            booths.forEach((booth, i) => this.addBoothMarker(booth, i + 1));
            resolve(booths);
          } else {
            // Fallback: show the geocoded location at least
            this.addCenterMarker(location, address);
            reject(new Error("No polling booths found nearby. The map shows your searched location."));
          }
        });
      });
    });
  }

  addBoothMarker(booth, number) {
    if (!this.map || !window.google) return;

    const marker = new window.google.maps.Marker({
      position: booth.location,
      map: this.map,
      title: booth.name,
      label: {
        text: String(number),
        color: "#ffffff",
        fontWeight: "bold"
      },
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 18,
        fillColor: "#6366F1",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2
      }
    });

    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="background:#1e1e3f;color:#fff;padding:12px;border-radius:8px;min-width:200px;">
          <strong style="color:#818cf8;">${booth.name}</strong><br>
          <span style="font-size:12px;color:#a0a0b0;">${booth.address}</span><br>
          <span style="font-size:12px;color:#10b981;">~${booth.distance.toFixed(1)} km away</span><br>
          <a href="https://maps.google.com/maps/dir/?api=1&destination=${booth.location.lat},${booth.location.lng}" 
             target="_blank" style="color:#818cf8;font-size:12px;text-decoration:none;">🗺️ Get Directions</a>
        </div>
      `
    });

    marker.addListener("click", () => {
      this.infoWindows.forEach(iw => iw.close());
      infoWindow.open(this.map, marker);
    });

    this.markers.push(marker);
    this.infoWindows.push(infoWindow);
  }

  addCenterMarker(location, label) {
    if (!this.map || !window.google) return;
    new window.google.maps.Marker({
      position: location,
      map: this.map,
      title: label,
      icon: {
        path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        scale: 8,
        fillColor: "#EF4444",
        fillOpacity: 1,
        strokeColor: "#fff",
        strokeWeight: 2
      }
    });
  }

  clearMarkers() {
    this.markers.forEach(m => m.setMap(null));
    this.infoWindows.forEach(iw => iw.close());
    this.markers = [];
    this.infoWindows = [];
  }

  // Haversine distance in km
  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  getDirectionsUrl(lat, lng) {
    return `https://maps.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }
}

export { MapsService };
