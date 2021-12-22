import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { formatTime } from '../Helpers/helpers';
import Slider from '@react-native-community/slider';
import { Icon } from 'react-native-elements';
import TrackPlayer, { Event, usePlaybackState, useProgress, Capability
} from 'react-native-track-player';

import { GlobalStyles } from '../GlobalStyles';
import { songs } from '../Helpers/songs';

const { width } = Dimensions.get('window');

const Controller = (props) => {
    const { songIndex, isPause, slider } = props;
    const { position, duration } = useProgress();
    const playBackState = usePlaybackState();

    const toggleControl = async () => {
        if(playBackState === 'playing' || playBackState === 3) {
            TrackPlayer.pause();
        } else if(playBackState === 'paused' || playBackState === 2) {
            TrackPlayer.play();
        }
    }

    const goNext = () => {
        let nextLength;
        songIndex === (songs.length - 1) ? nextLength = 1 : nextLength = songIndex + 1;

        slider.current.scrollToOffset({
            offset: Math.round(nextLength * width),
        });
    }

    const goBack = () => {
        slider.current.scrollToOffset({
            offset: (songIndex - 1) * width,
        });
    }

    return (
        <View style={{ paddingHorizontal: 40 }}>
            <View style={GlobalStyles.row_between_center}>
                <Icon name="thumb-down-outline" type="material-community" color="#fff" size={20} />
                <Text style={styles.title}>{songs[songIndex].title}</Text>
                <Icon name="thumb-up-outline" type="material-community" color="#fff" size={20} />
            </View>
            <Text style={styles.artist_name}>{songs[songIndex].artist}</Text>
            <View style={{ marginTop: 10 }}>
                <Slider
                    style={{ height: 40, width: width - 50, marginLeft: -15 }}
                    value={position}
                    minimumValue={0}
                    maximumValue={duration}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#ffffff"
                    thumbTintColor='#fff'
                    onSlidingComplete={(val) => TrackPlayer.seekTo(val)}
                />
            </View>
            <View style={[GlobalStyles.row_between_center, { marginTop: -10 }]}>
                <Text style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{formatTime(position)}</Text>
                <Text style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{formatTime(duration)}</Text>
            </View>
            <View style={[GlobalStyles.row_between_center, { marginTop: 30 }]}>
                <Icon name="shuffle" type="ionicon" color="#fff" />
                <Icon name="step-backward" type="font-awesome" color="#fff" 
                    onPress={() => goBack()}
                />
                <TouchableOpacity style={[styles.btn_pause, GlobalStyles.center]}
                    onPress={() => toggleControl()}
                >
                    <Icon name={isPause ? "play" : "pause"} type="ionicon" color="#fff" 
                        size={40} 
                    />
                </TouchableOpacity>
                <Icon name="step-forward" type="font-awesome" color="#fff" 
                    onPress={() => goNext()}
                />
                <Icon name="repeat" type="ionicon" color="#fff" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold',
    },
    artist_name: {
        textAlign: 'center',
        marginVertical: 5,
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 16,
    },
    btn_pause: {
        width: 70,
        height: 70,
        borderRadius: 40,
        backgroundColor: 'rgba(107, 5, 5, 1)',
    },
});

export default Controller;