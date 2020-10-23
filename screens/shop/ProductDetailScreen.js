//import libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

// create a component
const ProductDetailScreen = (props) => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId)
    )
    return (
        <View>
            <Text>
                {selectedProduct.title}
            </Text>
        </View>
    )
};

// define your styles
const styles = StyleSheet.create({
});

//make this component available to the app
export default ProductDetailScreen;
