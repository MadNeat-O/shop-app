//import libraries
import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

import Colors from '../../constants/Colors';

// create a component
const ProductItem = (props) => {
    return (
        <View style={styles.product}>
            <Image 
                style={styles.image}
                source={{uri:props.imageUrl}} 
            />
            <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.buttons}>
                <Button 
                    title="Details" 
                    color={Colors.primary}
                    onPress={props.onViewDetail}
                />
                <Button 
                    title="Add to cart" 
                    color={Colors.primary}
                    onPress={props.onAddToCart}
                />
            </View>
        </View>
    )
};

// define your styles
const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0, height: 2
        },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20
    },
    image: {
        width: '100%',
        height: '60%'
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        padding: 20
    }

});

//make this component available to the app
export default ProductItem;
