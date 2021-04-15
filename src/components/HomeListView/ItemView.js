import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const ItemView = (props) => {
    const item = props.item
    return (
        // Flat List Item
        <ListItem bottomDivider onPress={() => props.navigation.navigate('newQuestion')}>
            <Avatar title={item.question} source={item.thumb_url && { uri: item.thumb_url }} />
            <ListItem.Content>
                <ListItem.Title>{item.question.toUpperCase()}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    );
};

const styles = StyleSheet.create({
    itemStyle: {
        padding: 10,
    }
})
export default ItemView

