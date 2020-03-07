import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { register_user } from '../../actions/index';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';

class RegisterForm extends Component {
    /**
     * @param vals
     */
    submitForm(vals) {
        this.props.register_user(vals);
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
    render() {
        const { handleSubmit } = this.props;

        const styles = {
            register: { width: '100%', margin: '2% auto' },
            form: { width: '70vmin', margin: '0 auto' },
            signIn: { width: '100%', margin: '1% auto' },
            fields: { width: '100%' },
            centeredText: { textAlign: 'center', color: '#444' },
            body: { fontFamily: "'Quicksand', 'Roboto', Helvetica, sans-serif", width: '90vmin', margin:' 5vw auto 2vw', background: 'rgba(255, 255, 255, 0.93)', padding: '5%'},
            logo: { textAlign: 'center' }
        };
        return (
            <Paper style={styles.body} zDepth={4}>
                <p style={styles.logo}>
                    <img src="../../src/components/imgs/oladaablue.png" />
                </p>
                <form style={styles.form} onSubmit={ handleSubmit( (formValue) => {this.submitForm(formValue)})}>
                    <h2 style={styles.centeredText}>Register a New Account</h2>
                    <div>
                        <Field name="username"
                               component={this.renderTextField}
                               type="text"
                               label="Username"
                               style={styles.fields}
                               />
                    </div>
                    <div>
                        <Field name="email"
                               component={this.renderTextField}
                               type="text"
                               label="Email"
                               style={styles.fields}
                        />
                    </div>
                    <div>
                        <Field name="password"
                               component={this.renderTextField}
                               type="password"
                               label="Password"
                               style={styles.fields}
                        />
                    </div>
                    <div>
                        <Field name="password_confirmation"
                               component={this.renderTextField}
                               type="password"
                               label="Password Confirmation"
                               style={styles.fields}
                        />
                    </div>
                    <RaisedButton style={styles.register} type="submit" label="Register" primary={true} />
                    <h3 style={styles.centeredText}>Already have an account?</h3>
                    <RaisedButton style={styles.signIn} label="Sign In" containerElement={<Link to="/login"/>} secondary={true} />
                </form>
            </Paper>
        )
    }
}

/**
 * @param email
 * @returns {boolean}
 */
function validateEmail(email) {
    const allowedChars = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return allowedChars.test(email);
}

/**
 * @param username
 * @returns {boolean}
 */
function validateUserName(username){
    const allowedChars = /[*|\": <>#[\]{}%^`\\?!()';@&$]/;
    return allowedChars.test(username)
}

/**
 * @param password
 * @returns {boolean}
 */
function validatePassword(password){
    const space = /[ ]/;
    return space.test(password)
}

/**
 * @param vals
 * @returns {{}}
 */
function validate(vals){
    const errors = {};
    if(!vals.username) {
        errors.username = "Please enter a Username";
    }
    if(validateUserName(vals.username)){
        errors.username = 'Please enter a valid Username';
    }
    if(!validateEmail(vals.email)){
        errors.email = 'Please enter a valid Email Address';
    }
    if(!vals.password) {
        errors.password = "Please enter a Password";
    }
    if(validatePassword(vals.password)){
        errors.password = "Password must not contain spaces";
    }
    if(!vals.password_confirmation){
        errors.password_confirmation = 'Please confirm your password';
    }
    if(vals.password !== vals.password_confirmation){
        errors.password_confirmation = "Passwords do not match";
    }
    return errors;
}

RegisterForm = reduxForm({
    form: 'registerUser',
    validate
})(RegisterForm);

export default connect(null, { register_user })(RegisterForm);