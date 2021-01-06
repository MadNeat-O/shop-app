//import libraries
import React from 'react';
import { StyleSheet, Button, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/ProductsActions'

// create a component
const UserProductScreen = (props) => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', { productId: id  })
    }

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'This will delete this item', [
            {text: 'No', style: 'default'},
            {text: 'Yes', style: 'destructive', onPress: () => {
                console.log('Item Delete');
                dispatch(productsActions.deleteProduct(id))
            }}
        ])
    }

    return (
        <FlatList 
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem 
                    title={itemData.item.title}
                    price={itemData.item.price}
                    imageUrl={itemData.item.imageUrl}
                    onSelect={() => {
                        editProductHandler(itemData.item.id)
                    }}
                >
                    <Button
                        title="Edit"
                        color={Colors.primary}
                        onPress={() => {
                             editProductHandler(itemData.item.id)
                        }}
                    />
                    <Button
                        title="Delete"
                        color={Colors.primary}
                        onPress={deleteHandler.bind(this, itemData.item.id)}
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
