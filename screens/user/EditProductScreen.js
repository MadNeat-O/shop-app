//import libraries
import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../components/UI/Input';

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
            console.log(formState);
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

    const InputHandler = useCallback((inputId, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE, 
            value: inputValue, 
            isValid: inputValidity,
            input: inputId
        })
    }, [dispatchFormState])

    return (
        <ScrollView>
            <View style={styles.form}>
                <Input 
                    id='title'
                    label='Title'
                    errorText='Please enter a valid title'
                    keyboardType= 'default'
                    autoCapitalize='sentences'
                    autoCorrect
                    returnKeyType='next'
                    onInputChange={InputHandler}
                    initialValue={editedProduct ? editedProduct.title : ''}
                    initialValidity={!!editedProduct}
                    required
                />
                <Input 
                    id= 'imageUrl'
                    label='Image Url'
                    errorText='Please enter a valid image url'
                    keyboardType= 'default'
                    autoCapitalize='sentences'
                    autoCorrect
                    returnKeyType='next'
                    onInputChange={InputHandler}
                    initialValue={editedProduct ? editedProduct.imageUrl : ''}
                    initialValidity={!!editedProduct}
                    required
                />
                {editedProduct ? null : (
                    <Input 
                        id= 'price'
                        label='Price'
                        errorText='Please enter a valid Price in USD'
                        keyboardType= 'decimal-pad'
                        returnKeyType='next'
                        onInputChange={InputHandler}
                        required
                        min={0.01}
                    />
                )}
                <Input 
                    id='description'
                    label='Description'
                    errorText='Please enter a valid description'
                    keyboardType= 'default'
                    autoCapitalize='sentences'
                    autoCorrect
                    multiline
                    numberOfLines={3}
                    onInputChange={InputHandler}
                    initialValue={editedProduct ? editedProduct.description : ''}
                    initialValidity={!!editedProduct}
                    required
                />
            </View>
        </ScrollView>
    )
};

// define your styles
const styles = StyleSheet.create({
    form: {
        margin: 20,
        justifyContent: 'center'
    }
});

//make this component available to the app
export default EditProductScreen;
