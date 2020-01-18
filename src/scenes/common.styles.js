import {StyleSheet} from 'react-native';
import {Colors, Mixins, Typography} from "../styles/index";

export default StyleSheet.create({
    screen: {
        backgroundColor: Colors.SECONDARY_1,
        flex: 1,
        color: Colors.WHITE,
        alignSelf: 'stretch',
        alignItems: "center"
    },
    scrollView:{
        alignSelf: 'stretch',
        flex:1
    },
    colorWhite:{
        color: Colors.WHITE,
    },
    colorPrimary_1:{
        color: Colors.PRIMARY_1,
    },
    userInput:{
        width: '100%',
        height: Mixins.scaleSize(45),
        borderRadius: 20,
    },

});