import React, { Component } from 'react';

import { View, TouchableHighlight } from "react-native";

import { Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, Radio, CheckBox } from 'native-base';

import styles from './styles';

class CreateSubscriptionScreen extends Component {
    constructor(props){
        super(props);

		this.state = {
		  isSubCreated: false,
		  isItemSelected : '',
		  subscription: {}
		};
    }
    
    createSubscription(){
		console.log("inside createSubscription");
	
		fetch('http://192.168.0.51:3000/createSubscription',{
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
			.then((response) => {console.log('response'); return response.json();})
			.then((responseJson) => {console.log('responseData: '+responseJson); this.setState({isSubCreated : true, subscription : responseJson}); this.props.navigation.navigate('SubscriptionDetailsScreen', {subscription : responseJson});})
			.catch((err) => {console.log(err)}).done();  
    }
    
    render() {
        const subscription = this.state.subscription;
            
        const { params } = this.props.navigation.state.params;
        console.log('params: '+this.props.navigation.state.params.customer.email)

        if (this.state.isSubCreated) {
            console.log("to navigate to details screen");
            //this.props.navigation.navigate('SubscriptionDetailsScreen', {subscription : subscription});
        }
  
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body style={{flex: 3}}>
                        <Title>Create Subscription</Title>
                    </Body>
                    <Right />
                </Header>

                <Content padder style={{ padding: 20 }}>
                    <View>                       
                        <ListItem itemHeader first >
                            <Text style={styles.itemHeaderText}>Customer</Text>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.itemValueText}>{this.props.navigation.state.params.customer.email}</Text>
                        </ListItem>
                        <ListItem itemHeader>
                            <Text style={styles.itemHeaderText}>Plan</Text>
                        </ListItem>
                        <ListItem>
                            <Text></Text>
                        </ListItem>
                        <ListItem itemHeader>
                            <Text style={styles.itemHeaderText}>Options</Text>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.itemText}>Coupon</Text>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.itemText}>Tax</Text>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.itemText}>Trial</Text>
                        </ListItem>
                        <ListItem itemHeader>
                            <Text style={styles.itemHeaderText}>Billing</Text>
                        </ListItem>
                        <ListItem>
                            <Left>
								<Radio selected={false}/>
							</Left>
                            <Text style={styles.itemText}>Automatically charge default payment method on file</Text>
                        </ListItem>
                        <ListItem>
                            <Left>
								<Radio selected={true}/>
							</Left>
                            <Text style={styles.itemText}>Email invoices for customers to pay manually</Text>
                        </ListItem>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "flex-end", padding:10 }}>
                        <TouchableHighlight light style={styles.button} onPress={() => this.props.navigation.goBack()}>
              				<Text style={styles.buttonText}>Cancel</Text>
            			</TouchableHighlight>
                        <TouchableHighlight light style={styles.button} onPress={this.createSubscription()}>
              				<Text style={styles.buttonText}>Create Subscription</Text>
            			</TouchableHighlight>
                    </View>
                </Content>
			</Container>
        
        );
	}

}

export default CreateSubscriptionScreen;