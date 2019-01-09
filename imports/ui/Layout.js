import React, { PureComponent } from 'react';

import Navbar from './Navbar';

class Layout extends PureComponent {
    render() { 
        const { children } = this.props;
        return (
            <div>
                <Navbar />
                <div className="container">
                    {children}
                </div>
            </div>
        );
    }
}
 
export default Layout;
