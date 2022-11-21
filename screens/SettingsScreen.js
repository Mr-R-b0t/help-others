import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { firestore } from '@react-native-firebase/firestore'



const SettingsScreen = async () => {
  
  const status = await firestore().collection('users').doc('cvtIkZ6EclUQBp2nj4y2DlnaXvr2').get();

    return (
    
    <SafeAreaView>
        <customHeaderHomeButton />
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-1">
        <Text className="font-bold text-3xl">{status}</Text>
      </View>
    </SafeAreaView>
  )
}

export default SettingsScreen