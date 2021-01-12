//import libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Input = (props) => {
    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput 
                {...props}
                style={styles.input} 
                onChangeText={textChangeHandler.bind(this, 'title')}
                value={formState.inputValues.title} 
            />
            {!formState.inputValidities.title && <Text>{props.errorText}</Text>}
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
