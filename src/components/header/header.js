import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {logout_user} from '../../actions/index';

class Header extends Component {
    constructor(props){
    super(props);
    this.state = {open: false};
    }
    logOutUser(){
        document.cookie = 'activity_score=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
        this.props.logout_user();
        this.handleClose();        
    }
    handleToggle = () => this.setState({open: !this.state.open});
    handleClose = () => this.setState({open: false});
    render() {
        const styles = {
            logo: {margin: '5px auto 0', display: 'block'},
            aboutus: {verticalAlign: "-6px", marginRight: "20%"},
            home: {verticalAlign: "-6px", marginRight: "25%"},
            logout: {verticalAlign: "-6px", marginRight: "22%"},

        };
        return (
            <div>
                <AppBar
                        onLeftIconButtonTouchTap={this.handleToggle}
                        title={<img style={styles.logo} src="../../src/components/imgs/oladaa.png" />}
                />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    style={styles.bar}
                    onRequestChange={(open) => this.setState({open})}>

                    <MenuItem onTouchTap={this.handleClose}
                              containerElement={<Link to="/app/home"/>}>
                        <FontIcon className="material-icons"
                                style={styles.home}>home</FontIcon>Home</MenuItem>
                    <MenuItem onTouchTap={this.handleClose}
                              containerElement={<Link to="/app/about"/>}>
                        <FontIcon className="material-icons"
                                style={styles.aboutus}>face</FontIcon>About Us</MenuItem>
                    <MenuItem onTouchTap={() => this.logOutUser()}
                              containerElement={<Link to="/"/>}>
                        <FontIcon className="material-icons"
                                style={styles.logout} >exit_to_app</FontIcon>Log Out</MenuItem>
                </Drawer>
            </div>
        );
    }
}
export default connect(null, {logout_user: logout_user})(Header);
