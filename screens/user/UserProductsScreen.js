//import libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

// create a component
const UserProductScreen = (props) => {
    const userProducts = useSelector(state => state.products.userProducts);

    return (
        <FlatList 
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem 
                    title={itemData.item.title}
                    price={itemData.item.price}
                    imageUrl={itemData.item.imageUrl}
                    onViewDetail={() => {}}
                    onAddToCart={()=> {}}
                />
            }
        />
    )
};

// define your styles
const styles = StyleSheet.create({
});

//make this component available to the app
export default UserProductScreen;
