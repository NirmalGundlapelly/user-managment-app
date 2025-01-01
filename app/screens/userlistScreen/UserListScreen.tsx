import React, { useCallback } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getFontSize, getHeigth } from "../../Utils";
import { useFocusEffect } from "@react-navigation/native";
import { getUserList, User } from "../../redux/reducers/userList";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../redux/store";

interface IProps {
    navigation: {
        navigate: (route: string, params?: object) => void;
    };
}

const UserListScreen: React.FC<IProps> = ({ navigation }) => {
    const { users } = useSelector((state: RootState) => state.userList)
    const dispatch: AppDispatch = useDispatch();
    const defaultImage = 'https://i.sstatic.net/l60Hf.png'

    useFocusEffect(useCallback(() => {
        dispatch(getUserList())
    }, [dispatch]))

    const handleOnPress = (user: User) => {
        navigation.navigate('UserDetailScreen', { user });
    };

    const renderItem = ({ item }: { item: User }) => (
        <TouchableOpacity style={Styles.card} onPress={() => handleOnPress(item)}>
            <Image resizeMode="cover" source={{ uri: item.picture.thumbnail || defaultImage }} style={Styles.userImage} />
            <View style={Styles.userInfo}>
                <Text style={Styles.userName}>{item.name.first}</Text>
                <Text style={Styles.userPhone}>{item.phone}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={Styles.mainContainer}>
            <Text style={Styles.header}>User List</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.phone}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                contentContainerStyle={Styles.listContainer}
            />
        </View>
    );
};

export default UserListScreen;

const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#A7A19F',
        padding: getFontSize(4),
    },
    header: {
        fontSize: getFontSize(5),
        fontWeight: 'bold',
        marginBottom: getHeigth(2),
        textAlign: 'center',
        color: '#f9f9f9'
    },
    listContainer: {
        paddingBottom: getHeigth(3)
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: getFontSize(4),
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#DACDC7'
    },
    userImage: {
        width: getHeigth(6),
        height: getHeigth(6),
        borderRadius: 25,
        marginRight: 12,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: getFontSize(4),
        fontWeight: 'bold',
        color: '#333',
    },
    userPhone: {
        fontSize: getFontSize(3.5),
        color: '#666',
    },
});
