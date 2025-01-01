import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { getHeigth } from "../../Utils";

interface User {
    name: {
        first: string;
        last: string;
    };
    email: string;
    phone: string;
    picture: {
        large: string;
    };
}

interface IProps {
    navigation: {
        navigate: (route: string) => void;
    };
    route: {
        params: {
            user: User;
        };
    };
}

const UserDetailScreen: React.FC<IProps>  = ({ route }) => {
    const { user } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: user.picture.large }} style={styles.profileImage} />
            <Text style={styles.name}>
                {user.name.first} {user.name.last}
            </Text>
            <Text style={styles.detail}>Email: {user.email}</Text>
            <Text style={styles.detail}>Phone: {user.phone}</Text>
        </View>
    );
};

export default UserDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:getHeigth(10),
        alignItems: "center",
        backgroundColor: "#6E6B69",
        padding: 16,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#fff",
    },
    detail: {
        fontSize: 16,
        color: "#fff",
        marginVertical: 5,
    },
});
