import { EventEmitter } from '@angular/core';
export class GetMarkerService {
    add_marker = new EventEmitter();
    addMarker(marker){
        this.add_marker.emit(marker);
    }
}