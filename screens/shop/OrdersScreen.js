//import libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import OrderItem from '../../components/shop/OrderItem'

// create a component
const OrdersScreen = (props) => {
    const orders = useSelector(state => state.orders.orders);

    return (
        <View>
            <FlatList 
                data={orders}
                keyExtractor={item => item.orderId}
                renderItem={itemData => 
                    <OrderItem 
                        amount={itemData.item.totalAmount} 
                        date={itemData.item.readableDate}
                    />
                }
            />
        </View>
    )
};

// define your styles
const styles = StyleSheet.create({
});

//make this component available to the app
export default OrdersScreen;
