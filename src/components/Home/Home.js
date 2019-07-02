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
    fishOrder: {},
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

  addFishToOrder = (fishId) => {
    const fishOrderCopy = { ...this.state.fishOrder };
    fishOrderCopy[fishId] = fishOrderCopy[fishId] + 1 || 1;
    this.setState({ fishOrder: fishOrderCopy });
  }

  removeFromOrder = (fishId) => {
    const fishOrderCopy = { ...this.state.fishOrder };
    delete fishOrderCopy[fishId];
    this.setState({ fishOrder: fishOrderCopy });
  }

  saveNewOrder = (orderName) => {
    const newOrder = { fishes: { ...this.state.fishOrder }, name: orderName };
    newOrder.dateTime = Date.now();
    newOrder.uid = firebase.auth().currentUser.uid;
    ordersData.postOrder(newOrder)
      .then(() => {
        this.setState({ fishOrder: {} });
        this.getOrders();
      })
      .catch(err => console.error('trouble saving new order', err));
  }

  render() {
    const { fishes, orders, fishOrder } = this.state;
    return (
      <div className="Home container">
        <div className="row">
        <Inventory fishes={fishes} addFishToOrder={this.addFishToOrder}/>
        <NewOrder
        fishes={fishes}
        fishOrder={fishOrder}
        removeFromOrder={this.removeFromOrder}
        saveNewOrder={this.saveNewOrder}
        />
        <Orders orders={orders} deleteOrder={this.deleteOrder}/>
        </div>
      </div>
    );
  }
}

export default Home;
