import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getInputs} from '../../actions/BrowserActions';

class Main extends Component {
    constructor(props) {
        super(props);

        console.log('fillmore was started');
        this.props.getInputs();
        console.log('inputs', this.props.inputs);
    }

    render() {
        return (
            <div>This is main</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        inputs: state.inputs
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getInputs: () => dispatch(getInputs())
    };
}

export default connect()(Main);