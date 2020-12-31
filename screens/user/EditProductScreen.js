//import libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';

// create a component
const EditProductScreen = (props) => {
    const [title, setTitle] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={text => setTitle(text)}
                        value={title} 
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image Url</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={text => setImageUrl(text)}
                        value={imageUrl} 
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={text => setPrice(text)}
                        value={price} 
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={text => setDescription(text)}
                        value={description} 
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
