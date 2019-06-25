import React from 'react';

import './Home.scss';
import Inventory from '../Inventory/Inventory';
import NewOrder from '../NewOrder/NewOrder';
import Orders from '../Orders/Orders';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div className="row">
        <Inventory />
        <NewOrder />
        <Orders />
        </div>
      </div>
    );
  }
}

export default Home;
