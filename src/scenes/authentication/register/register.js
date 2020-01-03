import React from "react";
import {Text, TextInput, View} from "react-native";
import {PRIMARY_1, PRIMARY_2, WHITE} from "../../../styles/colors";
import {LinearGradient} from 'expo-linear-gradient/build/index';
import authenticationStyles from "../authentication.style";
import commonStyles from '../../common.styles.js'

const Register = props => {
    return (
        <View style={commonStyles.screen}>
            <View style={authenticationStyles.textView}>
                <Text style={{...authenticationStyles.greeting, ...commonStyles.colorWhite}}>Create an
                    account</Text>
            </View>
            <View style={authenticationStyles.inputView}>
                <TextInput placeholder='Username' underlineColorAndroid='transparent' placeholderTextColor={WHITE}
                           style={{...authenticationStyles.textInput, ...authenticationStyles.userInput, ...authenticationStyles.wrapper, ...authenticationStyles.colorPrimary_1}}/>
                <TextInput placeholder='Email' underlineColorAndroid='transparent' placeholderTextColor={WHITE}
                           style={{...authenticationStyles.textInput, ...authenticationStyles.userInput, ...authenticationStyles.wrapper, ...authenticationStyles.colorPrimary_1}}/>
                <TextInput placeholder='Password' secureTextEntry={true} underlineColorAndroid='transparent'
                           placeholderTextColor={WHITE}
                           style={{...authenticationStyles.textInput, ...authenticationStyles.userInput, ...authenticationStyles.wrapper, ...authenticationStyles.colorPrimary_1}}/>
            </View>
            <View style={authenticationStyles.buttonView}>
            <LinearGradient colors={[PRIMARY_1, PRIMARY_2]} style={{...authenticationStyles.button, ...authenticationStyles.userInput, ...authenticationStyles.wrapper}}>
                <Text style={ commonStyles.colorWhite}>Sign up </Text>
            </LinearGradient>
            </View>
        </View>
    );
};
export default Register;


// Linear gradient -> Linear gradient button
// inputs -> form organism
