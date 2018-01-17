import React, { Component } from 'react';

import { View } from "react-native";

import { Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, Radio, CheckBox } from 'native-base';

import styles from './styles';

class ManageSubscriptionsScreen extends Component {
	constructor(props){
		super(props);
		this.state = {
		  isLoading: true,
		  isItemSelected : '',
		  plans: {}
		};
	}

	componentDidMount(){
		console.log("inside componentDidMount");
	
		fetch('http://192.168.0.51:3000/getListOfSubscriptionPlans')
			.then((response) => {console.log('response'); return response.json();})
			.then((responseJson) => {console.log('responseData: '+responseJson); this.setState({isLoading : false, plans : responseJson}); return;})
			.catch((err) => {console.log(err)});  
	}

	render() {
		const plans = this.state.plans;
		console.log("plans: "+JSON.stringify(plans));
		const { params } = this.props.navigation.state.params;
		console.log('params: '+this.props.navigation.state.params.customer.email)
		console.log('params: '+JSON.stringify(this.props.navigation.state.params.customer))
		if (this.state.isLoading) {
		  return <View><Text>Loading...</Text></View>;
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
						<Title>Manage Subscriptions</Title>
					</Body>
					<Right />
				</Header>

				<Content padder style={{ padding: 20 }}>
					<View
            			style={{ flexDirection: "column", justifyContent: "space-between", padding:10 }}
          			>
					  	<Text>Customer : {this.props.navigation.state.params.customer.email}</Text>
						<Button iconLeft light style={styles.mb15} onPress={() => this.props.navigation.navigate("CreateSubscriptionScreen" , {customer : this.props.navigation.state.params.customer})}>
              				<Text>Create Subscription</Text>
            			</Button>
					</View>
					<View>
						<ListItem itemHeader first>
							<Text>Subscription Plans</Text>
						</ListItem>
						<List
							dataArray={plans.data}
							renderRow={(item,i) =>
								<ListItem 
									key={item.id}
									button 
									onPress={() => this.props.navigation.navigate(item.name)}>
									<Left>
										<CheckBox
											checked={true}
											/>
									</Left>
									<Text>
										{item.name}
									</Text>
									<Right>
										<Icon name='arrow-forward' />
									</Right>
								</ListItem>}
						/>
					</View>
				</Content>
			</Container>
		);
	}
}

export default ManageSubscriptionsScreen;
