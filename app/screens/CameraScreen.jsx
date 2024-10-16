import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Pressable } from 'react-native';
import { Camera } from 'expo-camera';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false); // To handle camera ready state
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null); // Ensure ref is initialized

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); // Correct permission request
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Handle when the camera is ready
  const onCameraReady = () => {
    setCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef.current && cameraReady) { // Ensure camera is ready before taking picture
      try {
        let photo = await cameraRef.current.takePictureAsync();
        console.log(photo); // Logs the photo details
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const toggleCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasPermission === null) {
    return <View />; // Placeholder view while permissions are being requested
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>; // No permission message
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={cameraRef} // Attach the ref to Camera
        onCameraReady={onCameraReady} // Handle camera ready event
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Pressable onPress={takePicture}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Take Picture</Text>
          </Pressable>
          <Pressable onPress={toggleCameraType}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Flip Camera</Text>
          </Pressable>
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;
