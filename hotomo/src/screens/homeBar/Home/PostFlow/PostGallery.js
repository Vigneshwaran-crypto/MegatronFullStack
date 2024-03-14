import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import {
  Camera,
  useCameraDevice,
  useCameraDevices,
} from 'react-native-vision-camera';
import {colors} from '../../../../common/colors';
import {textFontFaceLight} from '../../../../common/styles';
import {LOG, sSize} from '../../../../common/utils';
import Header from '../../../../components/Header';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';

const PostGallery = () => {
  const nav = useNavigation();
  const [imagesDetail, setImagesDetail] = useState({});
  const pageNum = useRef(20);

  const defList = useRef(-1);

  const camType = useCameraDevice('back', {
    physicalDevices: ['wide-angle-camera'],
  });
  const cameraRef = useRef(Camera);

  useEffect(() => {
    Camera.requestCameraPermission()
      .then(res => {
        LOG('camera permission :', res);
      })
      .catch(err => {
        LOG('camera permission error :', err);
      });

    getPhotosFromLocal();
  }, []);

  const getPhotosFromLocal = async () => {
    const deviceResources = await CameraRoll.getPhotos({
      assetType: 'All',
      include: ['albums', 'filename'],
      first: pageNum.current,
    });
    setImagesDetail(deviceResources);
    LOG('images from local :', deviceResources);
  };

  const listEndReached = dist => {
    defList.current = defList.current + 1;
    if (defList.current !== 0) {
      pageNum.current = pageNum.current + 30;
      getPhotosFromLocal();
    }
  };

  const onCameraPress = () => {
    try {
      launchCamera({
        saveToPhotos: true,
        durationLimit: 40 * 2,
        cameraType: 'back',
        quality: 1,
        mediaType: 'photo',
        presentationStyle: 'currentContext',
      })
        .then(res => {
          LOG('images of launchCamera :', res);

          imageProp = res.assets[0];

          const imgJson = {
            uri: imageProp.uri,
            type: imageProp.type,
            name: imageProp.fileName,
          };

          LOG('packet image :', imageProp);
          nav.navigate('createPost', {post: imgJson});
        })
        .catch(err => {
          LOG('launchCamera catch :', err);
        });
    } catch (err) {
      LOG('onCameraPress catch :', err);
    }
  };

  const onImageClick = img => {
    LOG('clicked image :', img);

    const image = img.node.image;

    const imgJson = {
      uri: image.uri,
      type: 'image/jpeg',
      name: image.filename,
    };

    LOG('packed image json :', imgJson);

    nav.navigate('createPost', {post: imgJson});
  };

  const renderImages = ({item, index}) => {
    return (
      <View style={styles.imageItemContainer} key={index}>
        <TouchableOpacity
          style={styles.itemImageView}
          onPress={onImageClick.bind(this, item)}>
          <Image
            source={{uri: item.node.image.uri}}
            style={styles.itemImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={'New Post'} />

      <View style={styles.contentCon}>
        <FlatList
          data={imagesDetail ? imagesDetail.edges : []}
          // data={[]}
          key={({item, index}) => index}
          renderItem={renderImages}
          onEndReached={listEndReached}
          numColumns={4}
          showsVerticalScrollIndicator={false}
          stickyHeaderHiddenOnScroll={true}
          bouncesZoom={true}
          fadingEdgeLength={30}
          ListHeaderComponent={
            <View style={styles.listHeaderContainer}>
              <TouchableOpacity
                style={styles.cameraView}
                onPress={onCameraPress}>
                <View style={styles.cameraHolder}>
                  {camType !== null && (
                    <Camera
                      ref={cameraRef}
                      device={camType}
                      style={{flex: 1}}
                      isActive={true}
                      photo={true}
                    />
                  )}
                </View>
              </TouchableOpacity>

              <Text style={styles.deviceText}>From You</Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentCon: {
    flex: 1,
  },

  imageItemContainer: {
    flex: 1 / 4,
    borderWidth: 0.7,
    height: sSize.width * 0.25,
    width: sSize.width * 0.25,
    borderColor: colors.halfTrans,
    resizeMode: 'cover',
  },
  itemImageView: {
    flex: 1,
  },
  itemImage: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  listHeaderContainer: {
    // borderWidth: 1,
    flex: 1,
  },
  cameraView: {
    height: sSize.width * 0.7,
    width: '100%',
    borderRadius: 10,
  },
  cameraHolder: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
  },
  deviceText: {
    fontFamily: textFontFaceLight,
    color: colors.darkBlue,
    fontSize: sSize.width * 0.045,
    padding: 10,
  },
});

export default PostGallery;
