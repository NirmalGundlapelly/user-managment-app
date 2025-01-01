import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../redux/store";
import { getUserList, setSearchQuery, setSortBy, setSortOrder, User } from "../../redux/reducers/userList";
import { getFontSize, getHeigth } from "../../Utils";

interface IProps {
    navigation: {
        navigate: (route: string, params?: object) => void;
    };
}

const UserListScreen: React.FC<IProps> = ({ navigation }) => {
    const {loading, filteredUsers, searchQuery, sortBy, sortOrder, error } = useSelector((state: RootState) => state.userList);
    const dispatch: AppDispatch = useDispatch();
    const defaultImage = 'https://i.sstatic.net/l60Hf.png';

    useEffect(() => {
        dispatch(getUserList());
    }, [dispatch]);

    const handleSearchChange = (text: string) => {
        dispatch(setSearchQuery(text));
    };

    const handleSortToggle = () => {
        const nextSortBy = sortBy === 'name' ? 'email' : 'name';
        dispatch(setSortBy(nextSortBy));
    };

    const handleSortOrderToggle = () => {
        const nextSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        dispatch(setSortOrder(nextSortOrder));
    };

    const handleOnPress = (user: User) => {
        navigation.navigate('UserDetailScreen', { user });
    };

    const handleRetry = () => {
        dispatch(getUserList());
    };

    const renderItem = ({ item }: { item: User }) => (
        <TouchableOpacity style={Styles.card} onPress={() => handleOnPress(item)}>
            <Image resizeMode="cover" source={{ uri: item.picture.thumbnail || defaultImage }} style={Styles.userImage} />
            <View style={Styles.userInfo}>
                <Text style={Styles.userName}>{item.name.first || ''}</Text>
                <Text style={Styles.userPhone}>{item.email || ''}</Text>
                <Text style={Styles.userPhone}>{item.phone || ''}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderEmptyComponent = (): JSX.Element => (
        <View style={Styles.emptyContainer}>
            <Text style={Styles.header}>No users available</Text>
        </View>
    );

    return (
        <View style={Styles.mainContainer}>
            <Text style={Styles.header}>User List</Text>
            <TextInput
                style={Styles.searchInput}
                placeholder="Search by name or email"
                value={searchQuery}
                onChangeText={handleSearchChange}
                placeholderTextColor={'#f9f9f9'}
            />
            <View style={Styles.sortControls}>
                <TouchableOpacity onPress={handleSortToggle} style={Styles.sortButton}>
                    <Text style={Styles.sortButtonText}>Sort by {sortBy}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSortOrderToggle} style={Styles.sortButton}>
                    <Text style={Styles.sortButtonText}>Order: {sortOrder}</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={Styles.loadingContainer}>
                    <ActivityIndicator color={'#f9f9f9'} size={'large'} />
                </View>
            ) : error ? (
                <View style={Styles.errorContainer}>
                    <Text style={Styles.errorMessage}>Failed to load users. {error}</Text>
                    <TouchableOpacity onPress={handleRetry} style={Styles.retryButton}>
                        <Text style={Styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    {filteredUsers.length === 0 ? (
                        renderEmptyComponent()
                    ) : (
                        <FlatList
                            data={filteredUsers}
                            keyExtractor={(item) => item.phone}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderItem}
                            contentContainerStyle={Styles.listContainer}
                        />
                    )}
                </>
            )}
        </View>
    );
};

export default UserListScreen;

const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#6E6B69',
        padding: getFontSize(4),
    },
    header: {
        fontSize: getFontSize(5),
        fontWeight: 'bold',
        marginBottom: getHeigth(2),
        textAlign: 'center',
        color: '#f9f9f9'
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 5,
        marginBottom: getHeigth(2),
        color:'#fff'
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
    loadingContainer: {
        height: getHeigth(60),
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyContainer: {
        height: getHeigth(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: getFontSize(4),
        color: '#888',
    },
    sortControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: getHeigth(2),
    },
    sortButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ffff'
    },
    sortButtonText: {
        color: '#fff',
        fontSize: getFontSize(3.5),
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: getHeigth(60),
    },
    errorMessage: {
        color: '#f9f9f9',
        fontSize: getFontSize(4),
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: getFontSize(3.5),
    },
});
