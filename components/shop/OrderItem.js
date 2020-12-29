//import libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import CartItem from './CartItem';

// create a component
const OrderItem = (props) => {
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button name="Show Details" color={Colors.primary} />
        </View>
    )
};

// define your styles
const styles = StyleSheet.create({
});

//make this component available to the app
export default OrderItem;
