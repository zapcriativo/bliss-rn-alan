import React from 'react'
import { TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

export default function NavigationBackButton(props) {
    return (
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ paddingHorizontal: 10 }}>
            <Icon
                name='arrow-left'
                type='font-awesome'
                color='#fff'
                size={20}
                iconStyle={{ marginLeft: 2, marginTop: -1 }}
            />
        </TouchableOpacity>
    )
}
