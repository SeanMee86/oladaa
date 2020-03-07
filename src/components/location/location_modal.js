import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Location from './location';
class LocationModal extends Component {
    state = {
        open: false,
    };
    handleOpen = () => {
        this.setState({open: true});
    };
    handleClose = () => {
        this.setState({open: false});
    };
    render() {
        const styles = {
            button: {
                marginRight: '2%'
            }
        };
        const actions = [
            <RaisedButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
                style={styles.button}
            />,
            <RaisedButton
                label="Submit"
                primary={true}
                onTouchTap={this.handleClose}
                type="submit"
            />,
        ];
        return (
            <div>
                <MenuItem onTouchTap={this.handleOpen}>Update Location</MenuItem>
                <Dialog
                    title="Your Current Location:"
                    actions={actions}
                    modal={true}
                    open={this.state.open}>
                    <Location/>
                </Dialog>
            </div>
        );
    }
}
export default LocationModal;