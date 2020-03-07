import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { login_user } from '../../actions/index'
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';

class LoginForm extends Component {
    /**
     * @param vals
     */
    submitForm(vals) {
        this.props.login_user(vals);
    }
    /**
     * @param input
     * @param label
     * @param touched
     * @param error
     * @param custom
     */
    renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
        <TextField hintText={label}
                   floatingLabelText={label}
                   errorText={touched && error}
                   {...input}
                   {...custom}
        />
    );
    render() {
        const { handleSubmit } = this.props;
        const styles = {
            register: { width: '100%', margin: '1% auto' },
            form: { width: '70vmin', margin: '0 auto' },
            signIn: { width: '100%', margin: '2% auto' },
            fields: { width: '100%' },
            centeredText: { textAlign: 'center', color: '#444' },
            body: { fontFamily: "'Quicksand', 'Roboto', Helvetica, sans-serif", width: '90vmin', margin:' 6vw auto 0', background: 'rgba(255, 255, 255, 0.93)', padding: '5%' },
            logo: { textAlign: 'center' }
        };
        return (
            <Paper style={styles.body} zDepth={4}>
                <p style={styles.logo}>
                    <img src="../../src/components/imgs/oladaablue.png" />
                </p>
                <h2 style={styles.centeredText}>Sign In</h2>
                <form style={styles.form} onSubmit={ handleSubmit( (formValue) => {this.submitForm(formValue)})}>
                    <div>
                        <Field name="username"
                               component={this.renderTextField}
                               type="text"
                               label="Username"
                               style={styles.fields}
                        />
                    </div>
                    <div className="form-group">
                        <Field name="password"
                               component={this.renderTextField}
                               type="password"
                               label="Password"
                               style={styles.fields}
                        />
                    </div>
                    <RaisedButton style={styles.signIn} type="submit" label="Sign In" primary={true} />
                    <h3 style={styles.centeredText}>Don't Have an Account?</h3>
                    <RaisedButton label="Register" style={styles.register} containerElement={<Link to="/register"/>} secondary={true} />
                </form>
            </Paper>
        )
    }
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
    if(!vals.password) {
        errors.password = "Please enter a Password";
    }
    return errors;
}

LoginForm = reduxForm({
    form: 'loginForm',
    validate
})(LoginForm);

export default connect(null, { login_user })(LoginForm);