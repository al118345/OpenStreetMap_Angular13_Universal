import { Component,Input,OnInit } from '@angular/core';
import {LeafletService} from "./service/leaflet.service";

export const DEFAULT_LAT = 48.20807;
export const DEFAULT_LON =  16.37320;
export const TITULO = 'Proyecto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  private map:any;
  @Input() lat: number = DEFAULT_LAT;
  @Input() lon: number = DEFAULT_LON;
  @Input() titulo: string = TITULO ;


  constructor(private mapService: LeafletService) {
  }
  //https://www.digitalocean.com/community/tutorials/angular-angular-and-leaflet
  //https://www.digitalocean.com/community/tutorials/angular-angular-and-leaflet-popup-service
  //https://www.digitalocean.com/community/tutorials/angular-angular-and-leaflet-marker-service
  ngOnInit(): void {
    if (this.mapService.L) {
      this.initMap();
    }
  }



  private initMap(): void {
    var iconRetinaUrl = 'assets/marker-icon-2x.png';
    var iconUrl = 'assets/marker-icon.png';
    var shadowUrl = 'assets/marker-shadow.png';
    var iconDefault: any;
    iconDefault = this.mapService.L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    this.mapService.L.Marker.prototype.options.icon = iconDefault;

    this.map =  this.mapService.L.map('map', {
      center: [this.lat, this.lon],
      attributionControl: false,
      zoom: 14
    });

    const tiles = this.mapService.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://1938.com.es">Web Inteligencia Artificial</a>'
    });
    //const marker = L.marker([this.lat, this.lon]);
    //marker.addTo(this.map);

    const lon = this.lon + 0.009;
    const lat = this.lat + 0.009;
    const marker = this.mapService.L.marker([lat + 0.005, lon + 0.005]).bindPopup(this.titulo);
    marker.addTo(this.map);

    const mark = this.mapService.L.circleMarker([this.lat, this.lon]).addTo(this.map);
    mark.bindPopup(this.titulo);
    mark.addTo(this.map);

    const mark2 = this.mapService.L.circleMarker([lat, lon]).addTo(this.map);
    mark2.addTo(this.map);



    this.mapService.L.Routing.control({
      router: this.mapService.L.Routing.osrmv1({
        serviceUrl: `https://router.project-osrm.org/route/v1/`
      }),
      showAlternatives: true,
      fitSelectedRoutes: false,
      show: false,
      routeWhileDragging: true,
      waypoints: [
        this.mapService.L.latLng(this.lat, this.lon),
        this.mapService.L.latLng(lat, lon)
      ]
    }).addTo(this.map);

    tiles.addTo(this.map);

  }

}
