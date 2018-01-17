import React, { Component } from 'react';

import { View, TouchableHighlight } from "react-native";

import { Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, Radio, CheckBox } from 'native-base';

import styles from './styles';

class SubscriptionDetailsScreen extends Component {
    constructor(props){
		super(props);
		this.state = {
		  isSubCreated: false,
		  isItemSelected : '',
		  subscription: {}
		};
    }

    render() {
        const subscription = this.state.subscription;
            
        const { params } = this.props.navigation.state.params;
        console.log('params: '+this.props.navigation.state.params.subscription.id)

        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body style={{flex: 3}}>
                        <Title>Subscription Details</Title>
                    </Body>
                    <Right />
                </Header>

                <Content padder style={{ padding: 20 }}>
                    <View>
                        <Text style={styles.itemText}>Customer {this.props.navigation.state.params.subscription.customer} on {this.props.navigation.state.params.subscription.plan.name}</Text>
                        <ListItem>
                            <Text style={styles.itemText}>ID: </Text>
                            <Text style={styles.itemValueText}>{this.props.navigation.state.params.subscription.id}</Text>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.itemText}>Customer: </Text>
                            <Text style={styles.itemValueText}>{this.props.navigation.state.params.subscription.customer}</Text>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.itemText}>Plan: </Text>
                            <Text style={styles.itemValueText}>{this.props.navigation.state.params.subscription.plan.name}</Text>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.itemText}>Quantity: </Text>
                            <Text style={styles.itemValueText}>{this.props.navigation.state.params.subscription.quantity}</Text>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.itemText}>Created: </Text>
                            <Text style={styles.itemValueText}>{this.props.navigation.state.params.subscription.created}</Text>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.itemText}>Tax Percent: </Text>
                            <Text style={styles.itemValueText}>{this.props.navigation.state.params.subscription.tax_percent}</Text>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.itemText}>Billing: </Text>
                            <Text style={styles.itemValueText}>{this.props.navigation.state.params.subscription.billing}</Text>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.itemText}>Days until due: </Text>
                            <Text style={styles.itemValueText}>{this.props.navigation.state.params.subscription.days_until_due}</Text>
                        </ListItem>
                    </View>
                </Content>
			</Container> 
        );
	}
}

export default SubscriptionDetailsScreen;