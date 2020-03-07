import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';
import Snackbar from 'material-ui/Snackbar';

const updateProfileIcon = <FontIcon className="material-icons">person_pin</FontIcon>;
const yourEventsIcon = <FontIcon className="material-icons">stars</FontIcon>;
const viewAllEventsIcon = <FontIcon className="material-icons">view_list</FontIcon>;

class Footer extends Component {
    state = {
            selectedIndex: null,
            open: false
    };

    select = (index) => {
        this.setState({selectedIndex: index});
    };

    handleRequestClose = () => {
        this.setState({
            open: false
        });
    };

    handleTouchTap = () => {
        event.preventDefault();
        this.setState({
            open: true
        });
    };
    /**
     * @returns {XML}
     */
    render(){
        const styles = {
            paper: {position: 'fixed', bottom: '0', width: '103%', margin: '0 -5px 0 -10px', zIndex: '3'},
            bNav: {textAlign: 'center'},
            snackbar: {textAlign: 'center', zIndex: '-2', marginBottom: '3.5em'},
            snackbarBody: {width: '100vw', minWidth: 'none', maxWidth: 'none'}
        };
        return (
            <Paper style={ styles.paper } zDepth={1}>
                <BottomNavigation selectedIndex={ this.state.selectedIndex }>
                    <BottomNavigationItem label="Update Profile" icon={ updateProfileIcon } onTouchTap={() => {
                        this.select(0); this.handleTouchTap()
                    }}/>
                    <BottomNavigationItem label="Your Events"
                                          icon={ yourEventsIcon }
                                          style={styles.bNav}
                                          onTouchTap={() => this.select(1)}
                                          containerElement={<Link to="/app/recommended_events"/>}/>
                    <BottomNavigationItem label="View All Events"
                                          icon={ viewAllEventsIcon }
                                          style={styles.bNav}
                                          onTouchTap={() => this.select(2)}
                                          containerElement={<Link to="/app/view_all"/>}/>
                </BottomNavigation>
                <Snackbar
                    style={styles.snackbar}
                    bodyStyle={styles.snackbarBody}
                    open={this.state.open}
                    message="Update Profile Coming Soon! ☆"
                    autoHideDuration={2500}
                    onRequestClose={() => {
                        this.handleRequestClose()
                    }}
                />
            </Paper>
        )
    }
}
export default Footer;