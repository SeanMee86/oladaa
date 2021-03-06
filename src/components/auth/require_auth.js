import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/**
 * @param ComposedComponent
 * @returns {*}
 */
export default function (ComposedComponent) {
    class Auth extends Component {
        /**
         * @type {{router: shim}}
         */
        static contextTypes = { router: PropTypes.object };
       componentWillMount(){
           if( !this.props.authenticated ){
               this.context.router.push("/");
           }
       }
       componentWillUpdate(nextProps){
           if( !nextProps.authenticated ){
               this.context.router.push("/")
           }
       }
        render(){
            return <ComposedComponent { ...this.props } />
        }
    }
    function mapStateToProps(state){
        return {
            authenticated: state.auth.authenticated
        }
    }
    return connect(mapStateToProps)(Auth);
}
