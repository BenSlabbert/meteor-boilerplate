import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';

export const PrivateHeader = (props) => {
    return (
        <div className="header">
            <div className="header__content">
                <h1 className="header__title">{props.title}</h1>
                <button className="button button--link-text" onClick={() => {
                    props.handleLogout()
                }}>Logout</button>
            </div>
        </div>
    );
};

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired
};

// anything returnd from this function is a prop
// to the presentational component above
export default createContainer(() => {
    return {
        handleLogout: () => { Accounts.logout(); }
    };
}, PrivateHeader);

// export default PrivateHeader;