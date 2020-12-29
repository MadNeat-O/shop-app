//import libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

// create a component
const OrdersScreen = (props) => {
    const orders = useSelector(state => {
        console.log(state.orders.orders);
        state.orders.orders
    });

    return (
        <View>
            <Text>poooop</Text>
            <FlatList 
                data={orders}
                keyExtractor={item => item.orderId}
                renderItem={itemData => {
                    <Text>
                        {itemData.item.totalAmount}
                    </Text>
                }}
            />
        </View>
    )
};

// define your styles
const styles = StyleSheet.create({
});

//make this component available to the app
export default OrdersScreen;
