import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWeather } from '../../actions/index';
class Home extends Component {
    componentWillMount(){
        this.props.fetchWeather(this.props.location);
    }
    render() {
        const { weather } = this.props;
        const styles = {
            mid_container: {height: '89vh', width: '100%', 'backgroundImage': `url(../src/components/imgs/weather/${weather.background})`, backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover'},
            weather_div: {zIndex: '5', position: 'fixed', top: '10vh', left: '2vh'},
            weather_icon: {margin: '0'},
            location_text: {margin: '3% 2% 0 1%', display: 'inline-block', verticalAlign: 'top', fontSize: '1.2em'},
        };
        return (
            <div>
                <div style={styles.mid_container}/>
                <div style={styles.weather_div} >
                    <p style={styles.location_text}>{weather.timezone}</p>
                    <p>{weather.summary}</p>
                </div>
            </div>
        )
    }
}
/**
 * @param state
 * @returns {{location, weather: (*|weather|{background, summary, timezone}|default_state.weather)}}
 */
function mapStateToProps(state){
    return {
        location: state.location.coords,
        weather: state.weather.weather
    }
}
export default connect(mapStateToProps, { fetchWeather })(Home);