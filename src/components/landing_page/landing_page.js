import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TypeOut from 'react-typeout';
import { Link } from 'react-router';

const phrases = ['Explore your community.', 'Relax after a hard day.', 'Try something new.', 'Have new experiences.', 'Meet new people.', 'Do what you enjoy.', 'Work hard, treat yourself.'];

class LandingPage extends Component {

    render() {
        const styles = {
            body: { height: '100vh', backgroundColor: '#fbfeff', position: 'relative' },
            logo: { display: 'block', margin: '0 auto', padding: '1%'},
            header: { position: 'fixed', top: '0', width: '100%', zIndex: 5},
            hero: { background: 'url(../../src/components/imgs/oladaa_lander.jpg) no-repeat center -100px fixed', backgroundSize: 'cover', height: '50vh', width: '100%'},
            register: { width: '9em', marginRight: '3%' },
            signIn: { width: '9em' },
            btnContainer: { textAlign: 'center', marginTop: '2%'},
            typeout: { position: 'relative', top: '20vh', color: 'rgba(255,255,255,1)', textAlign: 'center', width: '80vw', margin: '0 auto', backgroundColor: 'rgba(49, 23, 35, .8)', fontSize: '5vmin', padding: '2% 0 5%', height: '3.5vmin' },
            aboutH2: {textAlign: 'center', marginTop: '6%'},
            about: { width: '70vw', margin: '0 auto', paddingBottom: '5%'},
            aboutBody: { textAlign: 'justify', height: 'auto', backgroundColor: '#fbfeff', lineHeight: '1.5rem' }
        };
        return (
            <div style={styles.body}>
                <Paper style={styles.header}>
                    <img style={styles.logo} src="../../src/components/imgs/oladaablue.png"/>
                </Paper>
                <div style={styles.hero}>
                    <div style={styles.typeout}>
                        <TypeOut words={phrases} typeSpeed={100} pauseSpeed={2000} random={true} />
                    </div>
                </div>
                <div style={styles.btnContainer}>
                    <RaisedButton style={styles.register} label="Register" primary={true} containerElement={<Link to="/register"/>} />
                    <RaisedButton style={styles.signIn} label="Sign In" secondary={true} containerElement={<Link to="/login"/>} />
                </div>
                <div style={styles.aboutBody}>
                    <div style={styles.about}>
                        <h2 style={styles.aboutH2}>
                            About Oladaa
                        </h2>
                        <p>
                            Welcome! In Hawaiian, "ola" means life, and "daa" stands for dreaming about activities.  We set out to make an app that could get people moving, exploring their community, or relaxing based on their health and interests.
                        </p>
                        <p>
                            Once you create an account, you select your interests and connect your Fitbit account. Based on what you enjoy and what your activity level has been, we suggest exciting activities for you to do in your community!
                        </p>
                        <p>
                            Oladaa is a project by three developers in Southern California using React, Redux, PHP, and Material-UI.
                        </p>
                        <h3>
                            Disclaimer:  Oladaa will be a mobile app and is meant to be used on phones, tablets, and other mobile devices. Switch to one of these for an optimal experience.
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage;