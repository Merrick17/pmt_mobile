import {StyleSheet, Image, View} from 'react-native';
import React, {useEffect} from 'react';
import {Modal, Button} from 'native-base';
import {BASE_URL} from '../utils/apiHelpers';

const ImageModal = ({showModal, setShowModal, imageUrl}) => {
  useEffect(() => {
    console.log('Image URL', `${BASE_URL}/${imageUrl}`);
  }, [imageUrl]);
  return (
    <View>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />

          <Modal.Body>
            <Image
              source={{uri: `${BASE_URL}/${imageUrl}`}}
              style={{width: '100%', height: 500, resizeMode: 'contain'}}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}>
                OK
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default ImageModal;

const styles = StyleSheet.create({});
