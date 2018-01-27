import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Root } from 'native-base';
import { StackNavigator } from 'react-navigation';

import CustomersScreen from './screens/CustomersScreen';
import ManageSubscriptionsScreen from './screens/ManageSubscriptionsScreen';
import CreateSubscriptionScreen from './screens/CreateSubscriptionScreen';
import SubscriptionDetailsScreen from './screens/SubscriptionDetailsScreen';

const AppNavigator = StackNavigator({
    CustomersScreen: {screen: CustomersScreen},
    ManageSubscriptionsScreen: {screen: ManageSubscriptionsScreen},
    CreateSubscriptionScreen: {screen: CreateSubscriptionScreen},
    SubscriptionDetailsScreen: {screen: SubscriptionDetailsScreen},
  },
  {
    headerMode: "none",
  }
);

export default class App extends React.Component {
  render() {
    return (
		<Root>
			<AppNavigator />
		</Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
