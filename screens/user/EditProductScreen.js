//import libraries
import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import * as productsActions from '../../store/actions/ProductsActions';

// create a component
const EditProductScreen = (props) => {
    const dispatch = useDispatch();

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(prod => prod.id === prodId)
    )

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [titleIsValid, setTitleIsValid] = useState(false);
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const submitHandler = useCallback(() => {
        if (!titleIsValid) {
            Alert.alert(
                'Wrong input', 
                'Please check the errors in the form', 
                { text : 'ok' }
            );
            return;
        }
        if (editedProduct) {
            dispatch(productsActions.updateProduct(prodId, title, description, imageUrl))
        } else {
            dispatch(productsActions.createProduct(title, description, imageUrl, +price))
        }
        props.navigation.goBack();
    }, [dispatch, prodId, title, description, imageUrl, price, titleIsValid]);

    useEffect(() => {
        props.navigation.setParams({ 'submit': submitHandler })
    }, [submitHandler]);

    const titleChangeHandler = text => {
        if (text.trim().length === 0) {
            setTitleIsValid(false);
        } else {
            setTitleIsValid(true);
        }
        setTitle(text);
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={titleChangeHandler}
                        value={title} 
                        keyboardType= 'default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        onEndEditing={() => console.log('onEndEditing')}
                        onSubmitEditing={() => console.log('onSubmitEditing')}
                    />
                    {!titleIsValid && <Text>Please enter a title</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image Url</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={text => setImageUrl(text)}
                        value={imageUrl} 
                        keyboardType= 'default'
                    />
                </View>
                {editedProduct ? null : (
                <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={text => setPrice(text)}
                        value={price} 
                        keyboardType= 'decimal-pad'
                    />
                </View>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={text => setDescription(text)}
                        value={description}
                        keyboardType= 'default' 
                    />
                </View>
            </View>
        </ScrollView>
    )
};

// define your styles
const styles = StyleSheet.create({
    form: {
        margin: 20,
        justifyContent: 'center'
    },
    formControl: {
        width: '90%'
    },
    label: {
        fontFamily:'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

//make this component available to the app
export default EditProductScreen;
