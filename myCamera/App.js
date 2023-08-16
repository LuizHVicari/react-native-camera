import { StyleSheet, Text, View, SafeAreaView , TouchableOpacity} from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { useEffect, useState, useRef } from 'react'
import { FontAwesome } from '@expo/vector-icons'

export default function App() {
  const [cameraPermission, setCameraPermission] = useState(null)

  const camRef = useRef(null)

  const [type, setType] = useState(CameraType.back)

  const permissionFunction = async () => {
    const cameraPermssion = await Camera.requestCameraPermissionsAsync()

    setCameraPermission(cameraPermssion.status === 'granted')

    console.log(cameraPermission)

    if (cameraPermssion.status !== 'granted'){
      alert('Permission for media access needed')
    }
    }

  useEffect(() => {
    permissionFunction();
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
      >
        <View
        style={styles.contentButtons}
        >
          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={ () => {
              setType(
                type == CameraType.back ? CameraType.front : CameraType.back
              )}
            }
          >
            <FontAwesome name="exchange" size={23} color="red"></FontAwesome>
          </TouchableOpacity>
        </View>


      </Camera>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    width:"100%",
    height:"100%"
  },
  contentButtons: {
    flex: 1,
    backgroundColor:"transparent",
    flexDirection:"row",
  },
  buttonFlip: {
    position:"absolute",
    bottom:50,
    left:30,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#FFF",
    margin:20,
    height:50,
    width:50,
    borderRadius:50
  }
})
