import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { useEffect, useState } from 'react'

export default function App() {

  // const [type, setType] = useState(CameraType.back)
  // const [permission, requestPermssion] = Camera.useCameraPermissions()

  // // useEffect (() => {
  // //   (async () => {
  // //     console.log('aaaa')
  // //     const { status } = await Camera.requestCameraPermissionsAsync()
  // //     setHasPermission( status === 'granted')
  // //     console.log('bbbb')
  // //   })
  // // }, [])

  // if (!permission){
  //   <View>
  //     <Text>
  //       No access to camera
  //     </Text>
  //   </View>
  // }

  // if (!permission.granted){
  //   console.log('aaaaaa')
  // }
  const [cameraPermission, setCameraPermission] = useState(null)
  const [galleryPermission, setGalleryPermission] = useState(null)

  const [camera, setCamera] = useState(null)
  const [imageUri, setImageUri] = useState(null)
  const [type, setType] = useState(CameraType.back)

  const permissionFunction = async () => {
    const cameraPermssion = await Camera.requestCameraPermissionsAsync()

    setCameraPermission(cameraPermssion.status === 'granted')

    console.log(cameraPermission)

    const imagePermission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    console.log(imagePermission)

    if (imagePermission.status !== 'granted' && cameraPermssion.status !== 'granted'){
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
      ></Camera>
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
})
