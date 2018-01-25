import React, { Component } from 'react';

import { View, ActivityIndicator, Alert, FlatList } from "react-native";

import { Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, Radio, CheckBox } from 'native-base';

import styles from './styles';

class ManageSubscriptionsScreen extends Component {
	constructor(props){
		super(props);
		this.checkPlanChecked = this.checkPlanChecked.bind(this);
		this.state = {
		  isLoading: true,
		  checkboxes : [],
		  plans: {},
		  planIdMap: []
		}; 
	}

	componentDidMount(){
		console.log("MS inside componentDidMount");
	
		fetch('http://192.168.0.51:3000/getListOfSubscriptionPlans')
			.then((response) => {console.log('response'); return response.json();})
			.then((responseJson) => {console.log('responseData: '+responseJson); this.setState({isLoading : false, plans : responseJson}); return;})
			.catch((err) => {console.log(err)});  
	}

	toggleCheckbox(id, name) {
		let checkboxes = this.state.checkboxes;
		let planIdMap = this.state.planIdMap;

		if(planIdMap && planIdMap.includes(id)){
		  const index = planIdMap.indexOf(id);
		  checkboxes.splice(index, 1);
		  planIdMap.splice(index, 1);
		} else {
		  checkboxes = checkboxes.concat({planId: id, planName: name});
		  planIdMap = planIdMap.concat(id);
		}

		this.setState({checkboxes});
		this.setState({planIdMap});
	}

	checkPlanChecked(){
		if(this.state.checkboxes && this.state.checkboxes.length > 0)
			return true
		else
			return false
	}

	handleCreateSubscriptionButtonClick(){
		if (this.checkPlanChecked())
			this.props.navigation.navigate("CreateSubscriptionScreen" , {customer : this.props.navigation.state.params.customer, plans : this.state.checkboxes, planIds : this.state.planIdMap})
		else
			Alert.alert("Please choose atleast one subscription plan")
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

		const plans = this.state.plans;
		console.log("MS plans: "+JSON.stringify(plans));
		const { params } = this.props.navigation.state.params;
		console.log('MS params: '+JSON.stringify(this.props.navigation.state.params.customer))
		const checkboxes = this.state.checkboxes;
		const planIdMap = this.state.planIdMap;
		console.log("MS CB1: checkbox "+JSON.stringify(checkboxes));
		console.log("MS CB1: planid "+JSON.stringify(planIdMap));
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
						<Button iconLeft light style={styles.mb15} onPress={() => this.handleCreateSubscriptionButtonClick(checkboxes, planIdMap)}>
              				<Text>Create Subscription</Text>
            			</Button>
					</View>
					<View style={{flex:1}}>
						<ListItem itemHeader first>
							<Text>Subscription Plans</Text>
						</ListItem>
						{
							console.log("MS state: "+JSON.stringify(this.state))
						}
						<FlatList
							extraData={this.state}
							data={plans.data}
							keyExtractor={(item, index) => item.id}
							renderItem={({item}) => {
								const itemName = item.name;
								console.log("MS state: "+JSON.stringify(this.state))
								console.log('MS planIdMap: '+(planIdMap && planIdMap.includes(item.id)));
								console.log('itemName2: '+itemName);								
								return(
								<ListItem>
									<CheckBox
										onPress={() => this.toggleCheckbox(item.id, item.name)}
										checked={planIdMap && planIdMap.includes(item.id)}											
										/>
									<Body>
										<Text>
											{item.name}
										</Text>
									</Body>
									<Right>
										<Icon name='arrow-forward' />
									</Right>
								</ListItem>)}}
						/>
					</View>
				</Content>
			</Container>
		);
	}
}

export default ManageSubscriptionsScreen;
