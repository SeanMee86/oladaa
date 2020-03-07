import React from 'react';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
export default () => {
    const styles = {
        bar: { position: 'fixed', top: '0', left: '0', width: '100%', marginBottom: '20vh' }
    };
    return (
        <Toolbar style={styles.bar}>
            <ToolbarTitle text="fitbit"/>
        </Toolbar>
    )
}