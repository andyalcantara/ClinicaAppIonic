import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng,
  MyLocation
 } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

declare var google: any;

//API key for ios     AIzaSyBFYyvf0cXyN8D4-oU6eCb5pwaaK9OXkQU
//API key for Android AIzaSyAXPfb5Vv1nC8eK3inL8oMQdGAw2ikFFvQ

@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})

export class LocationPage {

  currentLocation: LatLng;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  
  start = this.currentLocation;
  end = new LatLng(26.114005, -80.348052);
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(
    public navCtrl: NavController, 
    private geolocation: Geolocation, 
    private callNumber: CallNumber) {}

  // Requests to the google directions api have the next form
  // URL: https://maps.googleapis.com/maps/api/directions/outputFormat?parameters in my case outputFormat will always be json so
  // URL: https://maps.googleapis.com/maps/api/directions/json?

  ionViewDidLoad(){
    this.initMap();
    this.gettingMyLocation();
  }

  gettingMyLocation() {
    this.geolocation.getCurrentPosition().then((location) => {
      this.currentLocation = new LatLng(location.coords.latitude, location.coords.longitude)
    }).catch(error => {
      console.log(error);
    })
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 17,
      center: { lat: this.end.lat, lng: this.end.lng },
      marker: { lat: this.end.lat, lng: this.end.lng }
    });

    this.directionsDisplay.setMap(this.map);
  }

  createMarker() {
    let markerOptions: MarkerOptions = {
      position: this.end,
      title: "Nuestra Clinica"
    };

    return this.map.addMarker(markerOptions);
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.currentLocation,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  callFromLocation() {
    if (this.callNumber.isCallSupported) {
      this.callNumber.callNumber("13059105202", true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    }
    console.log('Your call could not be completed!');
  }

}
