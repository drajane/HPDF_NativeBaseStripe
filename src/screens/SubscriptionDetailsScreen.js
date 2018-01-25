import React, { Component } from 'react';

import { View, TouchableHighlight, ActivityIndicator } from "react-native";

import { Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, Radio, CheckBox } from 'native-base';

import styles from './styles';

class SubscriptionDetailsScreen extends Component {
    constructor(props){
        super(props);

		this.state = {
		  isLoading: true,
          subscription: {},
		};
    }

    componentDidMount(){
        console.log("SD inside componentDidMount");
        console.log('SD params: '+this.props.navigation.state.params.customer.id)
	
		fetch('http://192.168.0.51:3000/createSubscription',{
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({customerId:this.props.navigation.state.params.customer.id, planIds:this.props.navigation.state.params.planIds, billing:this.props.navigation.state.params.billing})
            })
			.then((response) => { return response.json();})
			.then((responseJson) => {console.log('SD responseData: '+responseJson); this.setState({isLoading : false, subscription : responseJson});})
			.catch((err) => {console.log(err)});  
    }

    getPlanName() {
        let subscription = this.state.subscription;
        let planIds = this.props.navigation.state.params.planIds;
        console.log("SD inside getPlan "+subscription.items.total_count);
        console.log("SD inside getPlan "+planIds[0]);

        if ((subscription.items.total_count) > 1) {
            let titlePlanName = `${planIds[0]}`+ ` and 1 more...`;
            console.log("SD inside getPlan if "+titlePlanName);
            return titlePlanName; 
        }
        else{
            let subscriptionPlanName = subscription.plan.name;
            console.log("SD inside getPlan else "+subscription.plan.name);
            return subscriptionPlanName;
        }
    }

    render() {

        if (this.state.isLoading) {
            return (
				<View style={{ flexDirection: "row", alignContent: "center", justifyContent: "space-around", padding:10 }}>
				  <ActivityIndicator
					style={{ height: 80 }}
					color="#0000ff"
					size="large"
				  />
				</View>
			) 
        }

        const subscription = this.state.subscription;
        console.log("SD subscription: "+JSON.stringify(subscription));
        const { params } = this.props.navigation.state.params;
        console.log('SD params: '+this.props.navigation.state.params.customer.email)
        var planName = this.getPlanName();
        console.log("SD planName: "+planName);
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
                        <Text style={styles.sd_headingText}>Customer {subscription.customer} on {planName}</Text>
                        <ListItem>
                            <Text style={styles.sd_itemText}>ID: </Text>
                            <Text style={styles.sd_itemValueText}>{subscription.id}</Text>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.sd_itemText}>Customer: </Text>
                            <Text style={styles.sd_itemValueText}>{subscription.customer}</Text>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.sd_itemText}>Plan: </Text>
                            <List
                                dataArray={this.props.navigation.state.params.plans}
                                renderRow={(item, i) => 
                                    <ListItem key={item.planId}>
                                        <Text style={styles.sd_itemValueText}>{item.planName}</Text>
                                    </ListItem>
                                    }
                            />
                        </ListItem>
                        <ListItem>
                            <Text style={styles.sd_itemText}>Quantity: </Text>
                            <Text style={styles.sd_itemValueText}>{subscription.quantity}</Text>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.sd_itemText}>Created: </Text>
                            <Text style={styles.sd_itemValueText}>{subscription.created}</Text>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.sd_itemText}>Tax Percent: </Text>
                            <Text style={styles.sd_itemValueText}>{subscription.tax_percent}</Text>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.sd_itemText}>Billing: </Text>
                            <Text style={styles.sd_itemValueText}>{subscription.billing}</Text>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.sd_itemText}>Days until due: </Text>
                            <Text style={styles.sd_itemValueText}>{subscription.days_until_due}</Text>
                        </ListItem>
                    </View>
                </Content>
			</Container> 
        );
	}
}

export default SubscriptionDetailsScreen;