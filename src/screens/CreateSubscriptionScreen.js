import React, { Component } from 'react';

import { View, TouchableHighlight } from "react-native";

import { Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, Radio, CheckBox } from 'native-base';

import styles from './styles';

class CreateSubscriptionScreen extends Component {
    constructor(props){
        super(props);

		this.state = {
		  selectedRadio : 'charge_automatically',
		  subscription: {}
		};
    }

    toggleRadioButton(selection) {
        console.log("Inside toggleRadio: "+selection);
        this.setState({selectedRadio: selection});
    }

    render() {
        const subscription = this.state.subscription;
            
        const { params } = this.props.navigation.state.params;
        console.log('CS customer params: '+this.props.navigation.state.params.customer.email)
        console.log('CS plan params: '+JSON.stringify(this.props.navigation.state.params.plans))
        console.log("CS SelectedRadio: "+this.state.selectedRadio);
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
                        <List
							dataArray={this.props.navigation.state.params.plans}
							renderRow={(item, i) => 
                                    <ListItem key={item.planId}>
                                        <Text style={styles.itemValueText}>{item.planName}</Text>
                                    </ListItem>
                            }
                        />
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
								<Radio selected={this.state.selectedRadio === 'charge_automatically'} onPress={() => {this.toggleRadioButton('charge_automatically')}}/>
							</Left>
                            <Text style={styles.itemText}>Automatically charge default payment method on file</Text>
                        </ListItem>
                        <ListItem>
                            <Left>
								<Radio selected={this.state.selectedRadio === 'send_invoice'} onPress={() => {this.toggleRadioButton('send_invoice')}}/>
							</Left>
                            <Text style={styles.itemText}>Email invoices for customers to pay manually</Text>
                        </ListItem>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "flex-end", padding:10 }}>
                        <TouchableHighlight light style={styles.button} onPress={() => this.props.navigation.goBack()}>
              				<Text style={styles.buttonText}>Cancel</Text>
            			</TouchableHighlight>
                        <TouchableHighlight light style={styles.button} onPress={() => this.props.navigation.navigate('SubscriptionDetailsScreen', {customer : this.props.navigation.state.params.customer, planIds : this.props.navigation.state.params.planIds, billing : this.state.selectedRadio})}>
              				<Text style={styles.buttonText}>Create Subscription</Text>
            			</TouchableHighlight>
                    </View>
                </Content>
			</Container>
        
        );
	}

}

export default CreateSubscriptionScreen;