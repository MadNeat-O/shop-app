//import libraries
import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import * as productsActions from '../../store/actions/ProductsActions';

const FORM_INPUT_UPDATE = 'INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities
        }
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid =  updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities
        };
    }
    return state;
}

// create a component
const EditProductScreen = (props) => {
    const dispatch = useDispatch();

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(prod => prod.id === prodId)
    );

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
    })

    const submitHandler = useCallback(() => {
        if (!formState.inputValidities.title) {
            Alert.alert (
                'Wrong input', 
                'Please check the errors in the form', 
                { text : 'ok' }
            );
            return;
        }
        if (editedProduct) {
            dispatch(
                productsActions.updateProduct(
                    prodId, 
                    formState.inputValues.title, 
                    formState.inputValues.description, 
                    formState.inputValues.imageUrl
                ))
        } else {
            dispatch(
                productsActions.createProduct(
                    formState.inputValues.title, 
                    formState.inputValues.description, 
                    formState.inputValues.imageUrl, 
                    +formState.inputValues.price
                ))
        }
        props.navigation.goBack();
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({ 'submit': submitHandler })
    }, [submitHandler]);

    const textChangeHandler = (inputId, text) => {
        let isValid = false;
        if (text.trim().length === 0) {
            isValid = true;
        }
        dispatchFormState({
            type: FORM_INPUT_UPDATE, 
            value: text, 
            isValid: isValid,
            input: inputId
        })
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={textChangeHandler.bind(this, 'title')}
                        value={formState.inputValues.title} 
                        keyboardType= 'default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        onEndEditing={() => console.log('onEndEditing')}
                        onSubmitEditing={() => console.log('onSubmitEditing')}
                    />
                    {!formState.inputValidities.title && <Text>Please enter a title</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image Url</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={textChangeHandler.bind(this, 'imageUrl')}
                        value={formState.inputValues.imageUrl} 
                        keyboardType= 'default'
                    />
                </View>
                {editedProduct ? null : (
                <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={textChangeHandler.bind(this, 'price')}
                        value={formState.inputValues.price} 
                        keyboardType= 'decimal-pad'
                    />
                </View>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={text => textChangeHandler.bind(this, 'description')}
                        value={formState.inputValues.description}
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
