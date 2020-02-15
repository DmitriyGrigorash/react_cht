import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchSurveys } from "../../actions/user";

class SurveysList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    render() {
        return (
            <section>
                Surveys list
            </section>
        );
    }
}

const mapStateToProps = ({ surveysState }) => {
    return { surveys: surveysState.surveys };
};


SurveysList.defaultProps = {
    surveys: []
};
SurveysList.propTypes = {
    fetchSurveys: PropTypes.func,
    surveys: PropTypes.array
};

export default connect(mapStateToProps, { fetchSurveys })(SurveysList);
