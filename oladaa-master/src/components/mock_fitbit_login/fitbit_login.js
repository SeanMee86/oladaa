import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { loadSpinner } from '../../actions/index';
import FitbitHeader from './fitbit_header';

class FitbitLogin extends Component {

    setupSpinner() {
        browserHistory.push('/app/activity_note');
        this.props.loadSpinner(true);
    }
    /**
     * @param input
     * @param label
     * @param touched
     * @param error
     * @param custom
     */
    renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
        <div>
            <TextField hintText={label}
                       floatingLabelText={label}
                       errorText={touched && error}
                       {...input}
                       {...custom}
            />
        </div>
    );
    render(){
        const styles = {
            body: { width: '90vw', margin:'20% auto 2vw', background: 'rgba(255, 255, 255, 0.93)', padding: '5%' },
            form: { width: '75vw', margin: '0 auto' },
            button: { width: '50vw', margin: '5% 0 10% 0' },
            fields: { width: '100%'},
            h1: { textAlign: 'center', color: '#444' }
        };
        const { handleSubmit } = this.props;
        return(
            <div>
                <FitbitHeader />
                <Paper style={styles.body}>
                    <h1 style={styles.h1}>Log in</h1>
                    <form style={styles.form}>
                        <div>
                            <Field name="email"
                                   component={this.renderTextField}
                                   label="Email"
                                   type="text"
                                   style={styles.fields}
                            />
                            <Field name="password"
                                   component={this.renderTextField}
                                   type="password"
                                   label="Password"
                                   style={styles.fields}
                            />
                        </div>
                        <RaisedButton onClick={ handleSubmit((value) => {this.setupSpinner(value)}) }
                                      style={styles.button}
                                      label="Log in"
                                      secondary={true}
                                      fullWidth={true}
                                      type="submit"

                        />
                    </form>
                </Paper>
            </div>
        )
    }
}

function validateEmail(email) {
    const allowedChars = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return allowedChars.test(email);
}
function validate(vals){
    const errors = {};
    if(!validateEmail(vals.email)){
        errors.email = 'Please enter a valid Email Address';
    }
    if(!vals.password) {
        errors.password = "Please enter a Password";
    }
    return errors;
}

/**
 * @param state
 * @returns {{fitbit}}
 */
function mapStateToProps(state) {
    return {
        fitbit: state.fitbit.fitbit[0]
    }
}
FitbitLogin = reduxForm({
    form: 'fitbitForm',
    validate
})(FitbitLogin);
export default connect(mapStateToProps, { loadSpinner })(FitbitLogin);