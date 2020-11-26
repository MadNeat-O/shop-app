//import libraries
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';

// create a component
const CartScreen = (props) => {
    const cartTotalAmount = useSelector((state) => state.cart.TotalAmount)
    return (
        <View>
            <View>
                <Text>Total: <Text>${cartTotalAmount}</Text></Text>
                <Button 
                    title='Order Now'
                />
            </View>
            <View>
                <Text>Cart Items</Text>
            </View>
        </View>
    )
};

// define your styles
const styles = StyleSheet.create({
});

//make this component available to the app
export default CartScreen;
