import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const ItemView = (props) => {
    const item = props.item
    return (
        // Flat List Item
        <ListItem bottomDivider containerStyle={styles.listItem} onPress={() => props.navigation.navigate('Detail',{id: item.id})}>
            <Avatar rounded title={item.question} source={item.thumb_url && { uri: item.thumb_url }} />
            <ListItem.Content>
                <ListItem.Title style={styles.listItemText}>{item.question}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    );
};

const styles = StyleSheet.create({
    listItem: {
        
    },
    itemStyle: {
        padding: 10,
    },
    listItemText: {
        color: '#616161'
    }
})
export default ItemView

