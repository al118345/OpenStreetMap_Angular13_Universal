import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})


@Injectable()
export class LeafletService {

  public L:any = null;
  public Routing:any = null

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(platformId)) {
      this.L = require('leaflet');
      this.Routing = require('leaflet-routing-machine');
    }
  }

}
