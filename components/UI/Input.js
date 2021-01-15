//import libraries
import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useEffect, useReducer } from 'react/cjs/react.development';

// create a component

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid,
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            }
        default: 
            return state;

    }
}

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.isInitiallyValid,
        touched: false
    });

    const { onInputChange } = props;

    useEffect(() => {
        if (inputState.touched) {
            onInputChange(inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange]);
    
    const textChangeHandler = text => {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
    };

    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR });
    }

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput 
                {...props}
                style={styles.input} 
                value={inputState.value} 
                onChangeText={textChangeHandler}
                onBlur={lostFocusHandler}
            />
            {!inputState.isValid && <Text>{props.errorText}</Text>}
    </View>
)
};

// define your styles
const styles = StyleSheet.create({
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
export default Input;
