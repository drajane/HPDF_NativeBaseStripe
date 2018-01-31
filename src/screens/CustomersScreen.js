import React, { Component } from 'react';

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Body,
  Item,
  Input
} from 'native-base';

import { View, ActivityIndicator } from 'react-native';

import styles from "./styles";


export default class CustomersScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      customers: {}
    };
  }
  
  componentDidMount(){
    console.log("C inside componentDidMount");

    fetch('https://api.aspirator79.hasura-app.io/getListOfCustomers')
        .then((response) => {console.log('response'); return response.json();})
        .then((responseJson) => {console.log('responseData: '+responseJson); this.setState({isLoading : false, customers : responseJson}); return;})
        .catch((err) => {console.log(err)});  
  }


  render() {
    const customers = this.state.customers;
    console.log("C customers: "+JSON.stringify(customers));
    if (this.state.isLoading) {
      return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", padding:10 }}>
          <ActivityIndicator
            style={{ height: 80 }}
            color="#0000ff"
            size="large"
          />
        </View>
      )  
    }
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Customers</Title>
          </Body>
          <Right />
        </Header>
        <Content>
            <List
              dataArray={customers.data}
              renderRow={(item, i) => {
              const customerEmail = item.email; 
              const customerId = item.id; 
              console.log('customeremail: '+customerEmail)
              console.log('itemid: '+item.id)
              return (
                <ListItem 
                  key={item.id}
                  button noborder
                  onPress={() => this.props.navigation.navigate("ManageSubscriptionsScreen" , {customer : item})}>
                  <View style={{flexDirection: 'row'}}>
                    <Text>{customerEmail}</Text><Text style={styles.customerIdText}>{' - '+customerId}</Text>
                  </View>
                  <Icon name="arrow-forward" />
                </ListItem>)}}
            />
        </Content>
      </Container>
    );
  }
}