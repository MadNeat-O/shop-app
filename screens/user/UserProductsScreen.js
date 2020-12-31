//import libraries
import React from 'react';
import { StyleSheet, Button  } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/ProductsActions'

// create a component
const UserProductScreen = (props) => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    return (
        <FlatList 
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem 
                    title={itemData.item.title}
                    price={itemData.item.price}
                    imageUrl={itemData.item.imageUrl}
                    onSelect={() => {}}
                >
                    <Button
                        title="Edit"
                        color={Colors.primary}
                        onPress={() => {
                            
                        }}
                    />
                    <Button
                        title="Delete"
                        color={Colors.primary}
                        onPress={() => {
                            dispatch(productsActions.deleteProduct(itemData.item.id))
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
export default UserProductScreen;
