import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid, ScrollView, 
    TouchableOpacity, FlatList, Dimensions } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import YoutubeMusicApi from 'youtube-music-api';
// import MusicControl from 'react-native-music-control';
import TrackPlayer from 'react-native-track-player';
import { Image, Icon, Input } from 'react-native-elements';

import { requestPermission, stubStringText } from '../Helpers/helpers';
import { songs } from '../Helpers/songs';
import { GlobalStyles } from '../GlobalStyles';

const ListMusic = ({ navigation }) => {
    const api = new YoutubeMusicApi();
    const [musics, setMusics] = useState([]);
    const [currentTrackInfo, setCurrentTrackInfo] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // let trackIndex = TrackPlayer.getCurrentTrack();
        // let trackObject = TrackPlayer.getTrack(1);
        // console.log(trackObject);
        setMusics(songs);
    }, []);

    const setPlayer = async () => {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add(songs);
    }
    
    setPlayer();

    useEffect(() => {
        api.initalize().then(info => {
            api.search("reponn").then(result => {
                // console.log(result.content)
                result.content.map((res) => {
                    if(res.type === 'song' && res.artist.name === 'TroubleBoy Hitmaker') {
                        // console.log(res.thumbnails[0].url);
                        // console.log(res)
                        // setMusics(res);
                        
                    }
                })
            })
        });
    }, []);

    const handleSearchSong = (val) => {
        console.log(value);
    }

    return (
        <View style={styles.container}>
            <View style={[GlobalStyles.center]}>
                <Input 
                    placeholder='Rechercher des chansons'
                    inputContainerStyle={styles.input}
                    inputStyle={{ fontSize: 15, color: 'rgba(255, 255, 255, 0.8)' }}
                    leftIcon={() => (
                        <Icon name='search' type='ionicon' color='#fff' size={20} />
                    )}
                    rightIcon={() => (
                        <View style={GlobalStyles.row_between_center}>
                            <Text style={styles.text}>|</Text>
                            <Icon name='mic-outline' type='ionicon' color='#fff' size={20} />
                        </View>
                    )}
                    onChangeText={(e) => handleSearchSong(e)}
                />
            </View>
            <FlatList 
                showsVerticalScrollIndicator={false}
                data={musics}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View style={[styles.item, GlobalStyles.row_between_center]} 
                        key={index}
                    >
                        <TouchableOpacity style={[GlobalStyles.row, { flex: 9 }]}
                            onPress={() => navigation.navigate('Player', { id: item.id })}
                        >
                            <Image style={styles.img} source={require('../Images/picsou.jpg')} />
                            <View>
                                <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>{item.title}</Text>
                                <Text style={{ color: "#fff" }}>{stubStringText(item.artist)}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 0 }}>
                            <Icon name="dots-vertical" type="material-community" size={20} color="#fff" 
                                onPress={() => {}}
                            />
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={[styles.bottom, GlobalStyles.row_between_center]}>
                <TouchableOpacity style={[GlobalStyles.row, { flex: 6 }]}
                    onPress={() => {}}
                >
                    <View style={styles.bottom_img}>
                        <Image style={styles.img_bottom} source={require('../Images/picsou.jpg')} />
                    </View>
                    <View>
                        <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Mond yo a</Text>
                        <Text style={{ color: "#fff" }}>{stubStringText('D-FI Powet Revolte')}</Text>
                    </View>
                </TouchableOpacity>
                <View style={[GlobalStyles.row, { flex: 1 }]}>
                    <Icon name={isPlaying ? "play" : 'pause'} type="ionicon" size={22} color="#fff" 
                        onPress={() => setIsPlaying(!isPlaying)}
                        iconStyle={{ marginRight: 10 }}
                    />
                    <Icon name="dots-vertical" type="material-community" size={20} color="#fff" 
                        onPress={() => {}}
                    />
                </View>
            </View>
        </View>
    )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(66, 0, 0, 1)',
        paddingHorizontal: 20,
    },
    item: {
        height: 60,
        backgroundColor: 'transparent',
        marginBottom: 5,
        borderRadius: 5,
    },
    img: {
        width: 50,
        height: 45,
        borderRadius: 5,
        marginRight: 20,
    },
    input: {
        width: width - 40,
        height: 40,
        backgroundColor: '#6b0505',
        borderBottomColor: 'transparent',
        borderWidth: 0,
        borderRadius: 50,
        marginTop: 20,
        marginLeft: -10,
        paddingHorizontal: 10,
        color: '#fff',
    },
    text: {
        color: 'grey',
        fontWeight: 'bold',
        paddingRight: 10,
        fontSize: 20,
    },
    bottom: {
        width,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: '#6b0505',
        paddingHorizontal: 20,
        zIndex: 100,
    },
    img_bottom: {
        width: 45,
        height: 45,
        borderRadius: 50,
        marginRight: 20,
    },
    bottom_img: {
        marginTop: -20,
    }
});

export default ListMusic;