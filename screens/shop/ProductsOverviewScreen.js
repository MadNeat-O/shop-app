//import libraries
import React from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

// create a component
const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts)
    
    return (
        <FlatList 
            data={products}
            keyExtractor={item => item.id}
            renderItem={
                itemData => <Text>{itemData.item.title}</Text>
            }
        />
    )
};

// define your styles
const styles = StyleSheet.create({
});

//make this component available to the app
export default ProductsOverviewScreen;
