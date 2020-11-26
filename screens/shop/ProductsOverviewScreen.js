//import libraries
import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/CartActions';

import ProductItem from '../../components/shop/ProductItem';

// create a component
const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch(); 
    
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
                        onViewDetail={() => {
                            props.navigation.navigate('ProductDetail', { 
                                productId: itemData.item.id,
                                productTitle: itemData.item.title
                            })
                        }}
                        onAddToCart={() => {
                            dispatch(cartActions.addToCart(itemData.item))
                        }}
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
