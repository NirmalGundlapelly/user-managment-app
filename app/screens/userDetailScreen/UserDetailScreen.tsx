import React from "react"
import { Text, View } from "react-native"

interface Iprops {
    navigation: {
        navigate: (route: string) => string
    };
}


const UserDetailScreen: React.FC<Iprops> = () => {
    return (
        <View>
            <Text>User Detail Screen</Text>
        </View>
    )
}

export default UserDetailScreen