import { Injectable } from '@angular/core';
import { Location } from './location.model';

declare var google: any;

@Injectable()
export class ReverseLocationService {
    // city: any;
    // state: any;
    // long: any;
    // lat: any;
    // constructor(public locationService: LocationService) { }

    getGeoLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                return reject(new Error('Cannot get geolocation'));
            }

            var options = {
                enableHighAccuracy: true
            };

            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;

                let geocoder = new google.maps.Geocoder();
                let latlng = new google.maps.LatLng(lat, long);
                let request = {
                    latLng: latlng
                };

                geocoder.geocode(request, (results, status) => {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0] != null) {
                            // let city = results[0].address_components[results[0].address_components.length - 4].short_name;
                            // this.locationService.setLocationDetails(results[0]);
                            // console.log(this.locationService.getCity());
                            // this.city = this.locationService.getCity();
                            // this.state = this.locationService.getState();
                            // this.long = this.locationService.getLong();
                            // this.lat = this.locationService.getLat();
                            resolve(new Location(results[0].address_components[0].long_name,
                                                    results[0].address_components[1].long_name,
                                                    results[0].address_components[2].long_name,
                                                    results[0].address_components[4].long_name,
                                                    results[0].address_components[5].long_name,
                                                    results[0].address_components[6].long_name,
                                                    results[0].geometry.location.lng(),
                                                    results[0].geometry.location.lat()));
                        } else {
                            reject(new Error("No address available"));
                        }
                    }
                });

            }, error => {
                reject(error);
            }, options);
        });
    }
}