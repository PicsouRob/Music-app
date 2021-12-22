import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, 
    Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import TrackPlayer, { Event, usePlaybackState, Capability
 } from 'react-native-track-player';

import { GlobalStyles } from '../GlobalStyles';
import { songs } from '../Helpers/songs';
import Controller from './Controller';
import SwiperView from './SwiperView';

const { width } = Dimensions.get('window');

const Player = ({ route, navigation }) => {
    const ind = route.params.id * width;
    const scrollX = useRef(new Animated.Value(0)).current;
    const [isPause, setIsPause] = useState(false);
    const [songIndex, setSongIndex] = useState(0);
    const slider = useRef(null);
    const isPlayerReady = useRef(false);
    const playBackState = usePlaybackState();
    // Get the position
    const positionScroll = useRef(Animated.divide(scrollX, width)).current;

    useEffect(() => {
        scrollX.addListener((val) => {
            const valIndex = Math.round(val.value / width);
            setSongIndex(valIndex);
        });

        slider.current.scrollToOffset({
            offset: ind,
        });

        TrackPlayer.updateOptions({
            // Media controls capabilities
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                // Capability.Stop,
            ],
            compactCapabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
            ],
        });

        TrackPlayer.addEventListener(Event.PlaybackTrackChanged, (e) => {
            console.log(e);
        });

        TrackPlayer.setupPlayer().then(async () => {
            await TrackPlayer.reset();
            await TrackPlayer.add(songs);
            isPlayerReady.current = true;
            await TrackPlayer.play();
        });

        return () => {
            scrollX.removeAllListeners();
        }
    }, []);

    useEffect(() => {
        if(playBackState === 'playing' || playBackState === 3) {
            setIsPause(false);
        } else if(playBackState === 'playing' || playBackState === 2) {
            setIsPause(true);
        } else {
            setIsPause(false);
        }
    }, [playBackState]);

    useEffect(() => {
        if(isPlayerReady.current) {
            TrackPlayer.skip(songs[songIndex].id);
        }
    }, [songIndex]);

    const renderItem = (item, index) => {
        return (
            <Animated.View style={{
                width: width,
                alignItems: 'center',
                transform: [
                    {
                        translateX: Animated.multiply(
                            Animated.add(positionScroll, -index), -100
                        )
                    }
                ]
            }}>
                <Animated.Image source={require('../Images/picsou.jpg')} style={styles.image} 
                    resizeMode='contain'
                />
            </Animated.View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={[GlobalStyles.row_between_center, styles.top]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="angle-down" type="font-awesome" color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="dots-vertical" type="material-community" color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={{ height: 360, width }}>
                <Animated.FlatList 
                    ref={slider}
                    horizontal 
                    pagingEnabled 
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    data={songs}
                    renderItem={({ item, index }) => renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } }}],
                        { useNativeDriver: true }
                    )}
                />
            </View>
            <Controller songIndex={songIndex} isPause={isPause} slider={slider} />
            <SwiperView />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(66, 0, 0, 1)',
    },
    music_control: {

    },
    image: {
        width: width -40,
        height: 300,
        marginVertical: 30,
        alignItems: 'center',
    },
    top: {
        marginTop: 5,
        marginBottom: 20,
        marginHorizontal: 20,
    },
});

export default Player;