import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
class Location extends Component {
    render() {
        return !this.props.isGeolocationAvailable
            ? <div>Your browser does not support Geolocation</div>
            : !this.props.isGeolocationEnabled
                ? <div>Geolocation is not enabled</div>
                : this.props.coords
                    ? <table>
                        <tbody>
                        <tr><td>Latitude:</td><td>{this.props.coords.latitude}</td></tr>
                        <tr><td>Longitude: </td><td>{this.props.coords.longitude}</td></tr>
                        </tbody>
                    </table>
                    : <div>Updating to your location&hellip; </div>;
    }
}
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000
})(Location);