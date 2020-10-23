//import libraries
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

// create a component
const ProductDetailScreen = (props) => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId)
    )
    return (
        <ScrollView>
            <Image 
                style={styles.image}
                source={{uri: selectedProduct.imageUrl}} 
            />
            <View style={styles.buttonContainer}>
                <Button 
                    title='Add to Cart'
                    color={Colors.primary} 
                    onPress={() => {}} 
                />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
};

// define your styles
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    buttonContainer: {
        marginVertical: 10,
        alignItems: 'center'
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    }
});

//make this component available to the app
export default ProductDetailScreen;
