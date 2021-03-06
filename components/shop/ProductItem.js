//import libraries
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';

import Colors from '../../constants/Colors';
import Card from '../UI/Card';

// create a component
const ProductItem = (props) => {
    let TouchableComp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.version >= 21) {
        TouchableComp = TouchableNativeFeedback
    }

    return (
        <Card style={styles.product}>
            <View style={styles.touch}>
                <TouchableComp onPress={props.onSelect} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={{ uri: props.imageUrl }}
                            />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.buttons}>
                            {props.children}
                        </View>
                    </View>
                </TouchableComp>
            </View>
        </Card>
    )
};

// define your styles
const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20,
    },
    touch: {
        overflow: 'hidden',
        borderRadius: 10
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 5
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        padding: 20
    }
});

//make this component available to the app
export default ProductItem;
