import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { appwriteClient } from '../src/actions'
import { Account } from "appwrite";


const account = new Account(appwriteClient);

account.get().then((response) => {
    console.log(response);
}, (error) => {
    console.log(error);
});


const SignUp = async () => {
    const account = new Account(appwriteClient);
    account.create(
        ID.unique(),
        email,
        password,
        firstName + " " + lastName
    )
    .updatePrefs({
        "status": {status},
    })
    .then(response => {
        console.log(response);
    }, error => {
        console.log(error);
    });
    /*account.createVerification()*/
    account.createSession(email, password)
    .then(response => {
        console.log(response);
    }, error => {
        console.log(error);
    }
    );
}

const signUp = () => {
    return(
        <SafeAreaView>
                <View className="flex-row pb-3 items-center mx-4 space-x-2 px-1">
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Image source={{ uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" }} className=" h-7 w-7 bg-gray-300 p-4 rounded-full" />
                    </TouchableOpacity>
                    <View className="flex-1 mx-1">
                        <Text className="font-bold text-3xl">Help Others<ChevronDownIcon size={20} className="ml-2" /></Text>
                    </View>
                    <HomeIcon className="ml-2" size={35} onPress={() => navigation.navigate('Home')} />
                </View>
                <KeyboardAwareScrollView contentCotainerStyle={styles.container} className="pt-6">
                    <View style={{ marginVertical: 20 }}>
                        <View style={styles.imageContainer}>
                            <LottieView source={require('../assets/lottie/create_account.json')} autoPlay loop
                                style={{ width: 175, height: 175, alignSelf: 'center' }}
                            />
                        </View>                        </View>
                        <Text style={styles.signupText}>Register</Text>
                        <View style={{ marginHorizontal: 24 }}>
                            <Text style={{ fontSize: 16, color: '#8e93a1' }}>First name</Text>
                            <TextInput style={styles.signupInput} value={firstName} onChangeText={text => setfirstName(text)} />
                        </View>
                        <View style={{ marginHorizontal: 24 }}>
                            <Text style={{ fontSize: 16, color: '#8e93a1' }}>Last name</Text>
                            <TextInput style={styles.signupInput} value={lastName} onChangeText={text => setlastName(text)} />
                        </View>
                        <View style={{ marginHorizontal: 24 }}>
                            <Text style={{ fontSize: 16, color: '#8e93a1' }}>EMAIL</Text>
                            <TextInput style={styles.signupInput} value={email} onChangeText={text => setEmail(text)} autoCompleteType="email" keyboardType="email-address" />
                        </View>
                        <View style={{ marginHorizontal: 24 }}>
                            <Text style={{ fontSize: 16, color: '#8e93a1' }}>PASSWORD</Text>
                            <TextInput style={styles.signupInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplteType="password" />
                        </View>
                        <View style={{ marginHorizontal: 24 }}>
                            <Text style={{ fontSize: 16, color: '#8e93a1' }}>STATUS</Text>
                            <TextInput style={styles.signupInput} value={status} onChangeText={text => setStatus(text)} />
                        </View>
                        <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </KeyboardAwareScrollView>
            </SafeAreaView>
    )
}


const accountScreen = () => {
if(account){
    return(
        <SafeAreaView>
            <View className="flex-row pb-3 items-center mx-4 space-x-2 px-1">
                <Image source={{ uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" }} className=" h-7 w-7 bg-gray-300 p-4 rounded-full" />
                <View className="flex-1 mx-1">
                    <Text className="font-bold text-3xl">Help Others<ChevronDownIcon size={20} className="ml-2" /></Text>
                </View>
                <HomeIcon className="ml-2" size={35} onPress={() => navigation.navigate('Home')} />
            </View>
            <View className="flex  items-center justify-center py-16">
                <Image source={{ uri: image }} className="h-40 w-40 rounded-full" />
            </View>
            <View className="flex items-center justify-center py-10">
                <Text className="text-xl font-bold">Email : {account?.email} </Text>
            </View>
            <View className="flex  items-center justify-center py-0">
                <Text className="text-xl font-bold">Last name : {account?.lastName}</Text>
            </View>
            <View className="flex  items-center justify-center py-0">
                <Text className="text-xl font-bold">First name : {account?.firstName}</Text>
            </View>
            <View className="flex  items-center justify-center py-0">
                <Text className="text-xl font-bold">First name : {account?.status}</Text>
            </View>
            <View className="flex-1 items-center justify-center py-20">
                <TouchableOpacity onPress={logof} className="bg-blue-700 rounded-md h-10 w-96" >
                    <Text className="text-3xl text-center font-bold">Log of</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
else{
    return(
        <SafeAreaView>
            <View className="flex-row pb-3 items-center mx-4 space-x-2 px-1">
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Image source={{ uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" }} className=" h-7 w-7 bg-gray-300 p-4 rounded-full" />
                </TouchableOpacity>
                <View className="flex-1 mx-1">
                    <Text className="font-bold text-3xl">Help Others<ChevronDownIcon size={20} className="ml-2" /></Text>
                </View>
                <HomeIcon className="ml-2" size={35} onPress={() => navigation.navigate('Home')} />
            </View>

            <KeyboardAwareScrollView contentCotainerStyle={{ flex: 1, justifyContent: 'center' }} >
                <View style={{ marginVertical: 100 }}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" }} style={styles.imageStyles} />
                    </View>
                    <Text style={styles.signupText}>Sign Up</Text>
                    <View style={{ marginHorizontal: 24 }}>
                        <Text style={{ fontSize: 16, color: '#8e93a1' }}>EMAIL</Text>
                        <Input style={styles.signupInput} value={email} onChangeText={text => setEmail(text)} autoCompleteType="email" keyboardType="email-address" />
                    </View>
                    <View style={{ marginHorizontal: 24 }}>
                        <Text style={{ fontSize: 16, color: '#8e93a1' }}>PASSWORD</Text>
                        <Input style={styles.signupInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplteType="password" />
                    </View>
                    <Button title="Sign In" onPress={login} style={styles.buttonStyle} />
                    <Text style={{ fontSize: 12, textAlign: 'center' }} onPress={() => navigation.navigate('Sign')}>Not yet registered? Sign Up</Text>
                    <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 10 }} onPress={() => navigation.navigate('')}>Forgot Password?</Text>
                </View>

            </KeyboardAwareScrollView >
        </SafeAreaView >
    )
}

}



export default accountScreen    