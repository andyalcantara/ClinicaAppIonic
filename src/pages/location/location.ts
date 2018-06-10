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
import { Storage } from '@ionic/storage';


import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';

declare var google;

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
  currentMapTrack = null;

  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
  
  start = this.currentLocation;
  end = new LatLng(26.114005, -80.348052);
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  positionSubscription: Subscription;

  constructor(
    public navCtrl: NavController, 
    private geolocation: Geolocation, 
    private callNumber: CallNumber,
    private storage: Storage
  ) {

  }

  // Requests to the google directions api have the next form
  // URL: https://maps.googleapis.com/maps/api/directions/outputFormat?parameters in my case outputFormat will always be json so
  // URL: https://maps.googleapis.com/maps/api/directions/json?

  ionViewDidLoad(){
    this.loadHistoricRoutes();

    this.initMap();
    this.gettingMyLocation();
    this.calculateAndDisplayRoute();
  }

  startTracking() {
    this.isTracking = true;
    this.trackedRoute = [];
 
    this.positionSubscription = this.geolocation.watchPosition()
      .pipe(
        filter((p) => p.coords !== undefined) //Filter Out Errors
      )
      .subscribe(data => {
        setTimeout(() => {
          this.trackedRoute.push({ lat: data.coords.latitude, lng: data.coords.longitude });
          this.redrawPath(this.trackedRoute);
        }, 0);
      });
 
  }
 
  redrawPath(path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }
 
    if (path.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#ff00ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    }
  }

  loadHistoricRoutes() {
    this.storage.get('routes').then(data => {
      if (data) {
        this.previousTracks = data;
      }
    });
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
      title: "Clinica Dental Castellanos"
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

  stopTracking() {
    let newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
    this.previousTracks.push(newRoute);
    this.storage.set('routes', this.previousTracks);
   
    this.isTracking = false;
    this.positionSubscription.unsubscribe();
    this.currentMapTrack.setMap(null);
  }
   
  showHistoryRoute(route) {
    this.redrawPath(route);
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
