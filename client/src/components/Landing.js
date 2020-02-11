import React, {Component} from 'react';
import {connect} from "react-redux";


class Landing extends Component {

    componentDidMount() {
        // this.props.getUser()
    }

    render() {
        return (
            <article>
                Landing page
            </article>
        );
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getUser: () => {
//             dispatch(getUserData());
//         }
//     }
// };

export default connect(null, null)(Landing);
