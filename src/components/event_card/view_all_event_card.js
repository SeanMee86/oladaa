import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { getEvent, storeUserLocation } from '../../actions/index';
class ViewAllEventCard extends Component {
    componentWillMount(){
        this.props.getEvent(this.props.eventId, this.props.location, this.props.catIndex);
    }
    /**
     * @param nextProps
     */
    componentWillReceiveProps(nextProps){
        const coords = nextProps.coords;
        if(coords && this.props.coords !== coords && coords !== undefined && this.props.coords !== undefined){
            this.props.storeUserLocation(coords);
        }
    }
    getEvent(){
        this.props.getEvent(this.props.location);
    }
    /**
     * @returns {XML}
     */
    render () {
        const styles = {
            card: {width: '75vmin', margin: '0 auto 3%'},
            button: {marginTop: '4%'},
            text: {fontFamily: "'Quicksand', 'Roboto', Helvetica, sans-serif", letterSpacing: '1px', fontSize: '1.1rem', padding: '0 16px', color: '#5d6569'},
            title: {fontFamily: "'Quicksand', 'Roboto', Helvetica, sans-serif", zIndex: '0', fontSize: '2.5em', lineHeight: '1.1em', textAlign: 'center'}
        };

        const events = this.props.viewall[this.props.catIndex];
        if(events !== undefined) {
            const list_events = events.map((event, index) => {
                const date = new Date(event.time).toDateString();
                const time = new Date(event.time).toLocaleTimeString();
                const eventDescription = event.description ? event.description.slice(0,180)+'...' : "Please See Meetup page for more details...";
                return (
                    <Card zDepth={4} style={styles.card} key={index}>
                        <CardTitle actAsExpander={true}
                                   subtitle={date + ' @ ' + time}
                                   showExpandableButton={true}
                                   title={event.name}
                                   style={styles.title}/>
                        <CardText style={styles.text} expandable={true}>
                            {eventDescription}
                            <hr/>
                            People Attending: {event.yes_rsvp_count}
                            <CardActions>
                                <a target="_blank" href={event.event_url}><RaisedButton style={styles.button} secondary={true} label="See More Details..."/></a>
                            </CardActions>
                        </CardText>
                    </Card>
                )
            });
            return (
                <div>
                    {list_events}
                </div>
            )
        }
        else {
            return (
                <Card zDepth={4} style={styles.card}>
                    <CardTitle actAsExpander={true}
                               showExpandableButton={true}
                               title="Loading..."
                               style={{zIndex: '0'}}/>
                    <CardText expandable={true}>
                </CardText>
            </Card>)
        }
    }
}
/**
 * @param state
 * @returns {{viewall: (*|viewall|{}|default_state.viewall)}}
 */
function mapStateToProps(state) {
    return {
        viewall: state.events.viewall
    }
}
export default connect(mapStateToProps, { getEvent, storeUserLocation })(ViewAllEventCard);