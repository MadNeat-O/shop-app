//import libraries
import React from 'react';
import { StyleSheet, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/CartActions';

import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';

// create a component
const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch(); 

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', { 
            productId: id,
            productTitle: title
        })
    }
    
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
                        onSelect={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title)
                        }}
                    >
                        <Button
                            title="Details"
                            color={Colors.primary}
                            onPress={() => {
                                selectItemHandler(itemData.item.id, itemData.item.title)
                            }}
                        />
                        <Button
                            title="Add to cart"
                            color={Colors.primary}
                            onPress={() => {
                                dispatch(cartActions.addToCart(itemData.item))
                            }}
                        />
                    </ProductItem>
            }
        />
    )
};

// define your styles
const styles = StyleSheet.create({
});

//make this component available to the app
export default ProductsOverviewScreen;
