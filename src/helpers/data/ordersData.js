import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getMyOrders = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/orders.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const orders = [];
      Object.keys(res.data).forEach((orderKey) => {
        res.data[orderKey].id = orderKey;
        orders.push(res.data[orderKey]);
      });
      resolve(orders);
    })
    .catch(err => reject(err));
});

const deleteOrder = orderId => axios.delete(`${baseUrl}/orders/${orderId}.json`);

const postOrder = newOrder => axios.post(`${baseUrl}/orders.json`, newOrder);

export default { getMyOrders, deleteOrder, postOrder };
