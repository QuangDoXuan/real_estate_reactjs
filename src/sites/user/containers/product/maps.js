import React from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import districtProvider from '../../../../data-access/district-provider'


export class MapContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedPlace: []
        }
    }

    render() {
        return (
            <Map google={this.props.google}
                initialCenter={{
                    lat: this.props.lat,
                    lng: this.props.lon
                }}
                zoom={12}
            >
            {/* {districtProvider.map((item,index)=>{
                return(
                    <Marker
                    key={index}
                    title={item.Title}
                    name={item.Title}
                    position={{ lat: item.lat, lng: item.lon }} />
                )
            
            })} */}
            {this.props.hasAddress? 
                <Marker
                title={'Bất động sản tại '+ '' + this.props.address}
                name={this.props.address}
                position={{ lat: this.props.lat, lng:this.props.lon }} />

            :''}
                  
                <InfoWindow >
                    <div>
                        {/* <h1>{this.state.selectedPlace.name}</h1> */}
                        <h2>Thành phố Hà Nội</h2>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDtctErW2KvdNQaMZ5t6xl7SUGOXhzsKw8&libraries=places')
})(MapContainer)