//import libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

// create a component
const OrdersScreen = (props) => {
    const orders = useSelector(state => {
        state.orders.orders
    })

    return (
        <FlatList 
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => {
                <Text>
                    {itemData.item.totalAmount}
                </Text>
            }}
        />
    )
};

// define your styles
const styles = StyleSheet.create({
});

//make this component available to the app
export default OrdersScreen;
