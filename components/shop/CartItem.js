//import libraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// create a component
const CartItem = (props) => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity} </Text> 
                <Text styles={styles.mainText}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>{props.amount}</Text>
                <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons 
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} 
                        size={23}
                        color='red'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
};

// define your styles
const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888',
        padding: 5
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    }
});

//make this component available to the app
export default CartItem;
