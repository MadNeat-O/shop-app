//import libraries
import React from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

// create a component
const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts)
    
    return (
        <FlatList 
            data={products}
            keyExtractor={item => item.id}
            renderItem={
                itemData => 
                    <ProductItem 
                        title={itemData.item.title}
                        price={itemData.item.price}
                        imageUrl={itemData.item.imageUrl}
                        onViewDetail={console.log('View Details')}
                        onAddToCart={console.log('Add to Cart')}
                    />
            }
        />
    )
};

// define your styles
const styles = StyleSheet.create({
});

//make this component available to the app
export default ProductsOverviewScreen;
