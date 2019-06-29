import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Home.scss';
import Inventory from '../Inventory/Inventory';
import NewOrder from '../NewOrder/NewOrder';
import Orders from '../Orders/Orders';
import fishData from '../../helpers/data/fishData';
import ordersData from '../../helpers/data/ordersData';

class Home extends React.Component {
  state = {
    orders: [],
    fishes: [],
  }

  getOrders = () => {
    ordersData.getMyOrders(firebase.auth().currentUser.uid)
      .then(orders => this.setState({ orders }))
      .catch(err => console.error('cant get orders', err));
  }

  componentDidMount() {
    fishData.getFishes()
      .then(fishes => this.setState({ fishes }))
      .catch(err => console.error('could not get feesh', err));
    this.getOrders();
  }

  deleteOrder = (orderId) => {
    ordersData.deleteOrder(orderId)
      .then(() => this.getOrders())
      .catch(err => console.error('error with delete request', err));
  }

  render() {
    const { fishes, orders } = this.state;
    return (
      <div className="Home container">
        <div className="row">
        <Inventory fishes={fishes}/>
        <NewOrder />
        <Orders orders={orders} deleteOrder={this.deleteOrder}/>
        </div>
      </div>
    );
  }
}

export default Home;
