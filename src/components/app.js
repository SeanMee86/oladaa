import React from 'react';
import './app.css';
import Header from './header/header';
import Footer from './footer/footer';
const App = (props) => (
    <div>
        <Header />
        {props.children}
        <Footer />
    </div>
);
export default App;
