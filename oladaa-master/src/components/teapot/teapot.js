import React from 'react';
const Teapot = () => {
    const styles = {
        teapot_pic: {height: '60%', width: '60%', marginLeft: '19%'},
        heading: {textAlign: 'center'},
        heading3: {textAlign: 'center', margin: '1%'}
    };
    return (
        <div>
            <h1 style={styles.heading}>Error 418: I'm A Teapot</h1>
            <img style={styles.teapot_pic} src="../../src/components/imgs/teapot2.png"/>
            <h3 style={styles.heading3}>The requested entity body is short and stout. <br/>
                Tip me over and pour me out.
            </h3>
        </div>
    )
};
export default Teapot;