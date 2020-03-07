import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { getEvent } from '../../actions/index';
import ViewAllEventCard from '../event_card/view_all_event_card';

class ViewAllEventsList extends Component {
    /**
     * @param id
     * @param index
     */
    getEvent(id, index){
        this.props.getEvent(id, this.props.location, index);
    }
    renderCategories(){
        const styles = {
            text: {fontFamily: "'Quicksand', 'Roboto', Helvetica, sans-serif"},
            title: {fontSize: '1.3em'}
        };

        const categories = this.props.categories;
        if(categories !== undefined){
            /**
             * @type {Array}
             */
            const list_categories = categories.map((event, index) => {
                return (
                    <Card key={event.id} value={index} onTouchTap={() => this.getEvent(event.id, index)}>
                        <CardHeader style={styles.text} actAsExpander={true}
                                    showExpandableButton={true}
                                    title={event.name}
                                    titleStyle={styles.title}
                        />
                        <CardText expandable={true}>
                            <ViewAllEventCard catIndex={index} eventId={event.id} location={this.props.location} />
                        </CardText>
                    </Card>
                );
            });
            return list_categories;
        }
    }
    render(){
        const styles = {
            catCard: {background: 'rgba(255, 255, 255, 0.2)', marginBottom: '3em'},
        };
            return (
            <Paper zDepth={3}>
                <Card style={styles.catCard}>{this.renderCategories()}</Card>
            </Paper>
        );
    }
}
/**
 * @param state
 * @returns {{location, events, categories: (*|Array|string), expand}}
 */
function mapStateToProps(state){
    return {
        location: state.location.coords,
        events: state.events.all[0],
        categories: state.events.categories
    }
}

export default connect(mapStateToProps, { getEvent })(ViewAllEventsList);

