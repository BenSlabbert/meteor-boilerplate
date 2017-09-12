import React from 'react';

import PrivateHeader from './PrivateHeader';

// stateless component, presentational
export default () => {
    return (
        <div>
            <PrivateHeader title="Dashboard" />
            <div className="page-content">
                Dashboard content.
            </div>
        </div>
    );
};