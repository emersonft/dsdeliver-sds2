import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { fechOrders } from '../api';
import Header from '../Header';
import OrderCard from '../OrderCard';
import { Order } from '../types';

function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsloading] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const fechData = () => {
        setIsloading(true);
        fechOrders()
            .then(response => setOrders(response.data))
            .catch(error => Alert.alert('Houve um erro ao buscar os pedidos'))
            .finally(() => setIsloading(false))
    }

    useEffect(() => {
      if (isFocused) {
          fechData();
      }
    }, [isFocused]);

    const handleOnPress = (order: Order) => {
        navigation.navigate('OrderDetails', {
            order
        });
    }

    return (
        <>
            <Header />
            <ScrollView style={styles.container}>
                {isLoading ? (
                    <Text>Buscando Pedidos...</Text>
                ) : (
                        orders.map(order => (
                            <TouchableNativeFeedback
                                key={order.id}
                                onPress={() => handleOnPress(order)}
                            >
                                <OrderCard order={order} />
                            </TouchableNativeFeedback>
                        ))
                    )}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingRight: '5%',
        paddingLeft: '5%',

    }
});

export default Orders;
