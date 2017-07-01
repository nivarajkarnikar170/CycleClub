export class Location {
    constructor(
        private _address: string, 
        private _street: string, 
        private _city: string, 
        private _state: string, 
        private _country: string, 
        private _post: number, 
        private _long: number, 
        private _lat: number) {
        // this.address = address; //result.address_components[0].long_name;
        // this.street = street; // result.address_components[1].long_name;
        // this.city = city; //result.address_components[2].long_name;
        // this.state = state; //result.address_components[4].long_name;
        // this.country = country;// result.address_components[5].long_name;
        // this.post = result.address_components[6].long_name;
        // this.long = result.geometry.location.lng();
        // this.lat = result.geometry.location.lat();
        
        }
    get address(){
        return this._address;
    }
    get street(){
        return this._street;
    }
    get city(){
        return this._city;
    }
    get state(){
        return this._state;
    }
    get country(){
        return this._country;
    }
    get post(){
        return this._post;
    }
    get long(){
        return this._long;
    }
    get lat(){
        return this._lat;
    }
}