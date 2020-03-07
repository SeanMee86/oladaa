import React from 'react';
import Paper from 'material-ui/Paper';

const About = () => {
    const styles = {
        paper: { width: '90vmin', margin:'2vmin auto 15vmax', background: 'rgba(255, 255, 255, 0.93)', padding: '2%' },
        heading: { fontFamily: "'Quicksand', 'Roboto', Helvetica, sans-serif", marginLeft: '1%', textAlign: 'center', paddingTop: '1%'},
        us_pic: { width: '65vmin', margin: 'auto', display: 'block' },
        heading4: { fontFamily: "'Quicksand', 'Roboto', Helvetica, sans-serif", textAlign: 'justify', marginLeft: '2%', paddingBottom: '2%', lineHeight: '1.5rem'},
        caption: { textAlign: 'center', fontSize: '13px'}
    };

    return (
        <Paper zDepth={3} style={styles.paper}>
            <div>
                <h1 style={styles.heading}>About Us</h1>
                <img style={styles.us_pic} src="../../src/components/imgs/beats_peeps.jpg"/>
                <p style={styles.caption}>(From Left to Right: Sean Mee, Miranda Bashore, and Kevin Nguyen)</p>
                <h4 style={styles.heading4}>Thanks for coming to our site! We hope you enjoyed our application and found it useful. In Hawaiian, <em>"ola"</em> means life, and <em>"daa"</em> stands for dreaming about activities. Together, our goal at Oladaa, is to help people of various activity levels, find events around their communities, in the hopes of bettering one's life.</h4>
                <small>Weather data Powered by <a target="_blank" href="https://darksky.net/poweredby/">Dark Sky</a></small>
            </div>
        </Paper>
    )
};
export default About;