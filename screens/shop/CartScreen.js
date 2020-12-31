//import libraries
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/CartActions';
import * as orderActions from '../../store/actions/OrderActions';

// create a component
const CartScreen = (props) => {
    const dispatch = useDispatch();
    const cartTotalAmount = useSelector((state) => state.cart.totalAmount)
    const cartItems = useSelector((state) => {
        const cartArr = []
        for (const key in state.cart.items) {
            cartArr.push({
                productKey: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return cartArr.sort((a, b) => {
            a.productKey > b.productKey ? 1 : -1
        });
    })

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                    <Button 
                        title='Order Now'
                        color={Colors.accent}
                        disabled={cartItems.length === 0}
                        onPress={() => {
                            dispatch(orderActions.addOrder(cartItems, cartTotalAmount))
                        }}
                    />
            </View>
            <FlatList 
                data={cartItems}
                keyExtractor={item => item.productKey}
                renderItem={itemData => 
                    <CartItem 
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum.toFixed(2)}
                        quantity={itemData.item.quantity}
                        onRemove={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productKey))
                        }}
                        deletable
                    />
                }
            />
        </View>
    )
};

// define your styles
const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0, height: 2
        },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
});

//make this component available to the app
export default CartScreen;
