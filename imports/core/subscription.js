import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { startSubscription, stopSubscription } from 'meteor-redux-middlewares';

/* eslint no-param-reassign: 0 */

/**
 * Higher order component for transparently integrating a Meteor subscription.
 * Data is automatically inserted and updated in the props.
 *
 * @key: String
 * The key parameter is a string that represents the name of the subscription.
 * This must be equal to the name used in Meteor.publish. It automatically
 * signals Redux with events like 'SUBSCRIPTION_STARTED', 'SUBSCRIPTION_STOPPED'
 * and @key + '_SUBSCRIPTION_READY and @key + '_SUBSCRIPTION_CHANGED. The state
 * as updated from the reducer, will automatically update the props of the
 * component.
 *
 * @get: Function
 * This function is used to retrieve the published data from your collection.
 * ie: () => Demo.find({}).fetch()
 */
const withSubscription = ({
  key, get,
}) => (Component) => {
  /**
   * Insert or wrap componentDidMount. In this method
   * the subscription starts.
   */
  const orgComponentDidMount = Component.prototype.componentDidMount;
  Component.prototype.componentDidMount = function () {
    this.props.subscribe((this.state || {}).filter);
    if (typeof orgComponentDidMount === 'function') {
      orgComponentDidMount.apply(this);
    }
  };

  /**
   * Insert or wrap componentWillUnmount. In this method
   * the subscription stops.
   */
  const { componentWillUnmount } = Component.prototype;
  Component.prototype.componentWillUnmount = function () {
    this.props.unsubscribe();
    if (typeof componentWillUnmount === 'function') {
      componentWillUnmount.apply(this);
    }
  };

  const subscribe = filter => startSubscription({
    key,
    get,
    subscribe: () => {
      console.log('subscribe-filter', filter);
      return Meteor.subscribe(key, filter);
    },
    onReadyData: () => ({
      receivedAt: new Date(),
    }),
  });

  const unsubscribe = () => stopSubscription(key);

  return connect(
    state => state[key],
    dispatch => ({
      subscribe: () => dispatch(subscribe()),
      unsubscribe: () => dispatch(unsubscribe()),
    }),
  )(Component);
};

export default withSubscription;