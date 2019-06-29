import PropTypes from 'prop-types';

const orderShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dateTime: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
  fishes: PropTypes.object.isRequired,
});

export default { orderShape };
