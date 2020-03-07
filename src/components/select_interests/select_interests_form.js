import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox'
import { connect } from 'react-redux';
import getIds from './ids';
import { submit_interests } from '../../actions/index';
import Paper from 'material-ui/Paper';
class SelectInterests extends Component {
    /**
     * @param vals
     */
    submitForm(vals) {
        const idArray = getIds(vals);
        this.props.submit_interests(idArray);
        browserHistory.push('/app/welcome_user');
    }
    /**
     * @param name
     * @param onChange
     * @param label
     * @returns {XML}
     */
    renderCheckbox({ input: {name, onChange}, label }) {
        return (
            <Checkbox label={label}
                  name={name}
                  onCheck={onChange}/>
        )
    };
    render() {
        const { handleSubmit } = this.props;
        /**
         * @type {{submit: {width: string, margin: string}, form: {width: string, margin: string}, fields: {width: string, float: string}, centeredText: {textAlign: string, color: string}, body: {width: string, margin: string, background: string, padding: string}}}
         */
        const styles = {
            submit: { width: '100%', margin: '5% auto' },
            form: { width: '50vmin', margin: '5% auto 0' },
            fields: { width: '100%', float: 'left' },
            centeredText: { fontFamily: "'Quicksand', 'Roboto', Helvetica, sans-serif", textAlign: 'center', color: '#444' },
            body: { width: '85vw', margin:' 8vw auto 0', background: 'rgba(255, 255, 255, 0.93)', padding: '5%' },
        };
        return (
            <Paper style={styles.body} zDepth={4}>
                <h2 style={styles.centeredText}>Please Select At Least 3 Interests:</h2>
                <form style={styles.form} onSubmit={ handleSubmit( (formValue) => {this.submitForm(formValue)})}>
                        <Field name="Sports & Fitness" component={this.renderCheckbox} label="Sports & Fitness"/>
                        <Field name="Dance" component={this.renderCheckbox} label="Dance"/>
                        <Field name="Outdoors & Adventures" component={this.renderCheckbox} label="Outdoors & Adventures"/>
                        <Field name="Health & Wellness" component={this.renderCheckbox} label="Health & Wellness"/>
                        <Field name="Music" component={this.renderCheckbox} label="Music"/>
                        <Field name="Pets" component={this.renderCheckbox} label="Pets"/>
                        <Field name="Social" component={this.renderCheckbox} label="Social"/>
                        <Field name="Photography" component={this.renderCheckbox} label="Photography"/>
                        <Field name="Arts" component={this.renderCheckbox} label="Arts"/>
                        <Field name="Hobbies & Crafts" component={this.renderCheckbox} label="Hobbies & Crafts"/>
                        <Field name="Sci-Fi & Games" component={this.renderCheckbox} label="Sci-Fi & Games"/>
                        <Field name="Film" component={this.renderCheckbox} label="Film"/>
                    <RaisedButton style={styles.submit} type="submit" label="Submit" primary={true}/>
                </form>
            </Paper>
        )
    }
}
SelectInterests = reduxForm({
    form: 'selectInterests'
})(SelectInterests);
/**
 * @param state
 * @returns {{events: (Array|*|string)}}
 */
function mapStateToProps(state){
    return {
        events: state.events.categories
    }
}


export default connect(mapStateToProps, { submit_interests })(SelectInterests);