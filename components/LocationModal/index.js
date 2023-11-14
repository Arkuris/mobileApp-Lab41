import React from 'react';
import { Modal, Button, VStack, Text } from 'native-base';

const LocationPickerModal = ({ isVisible, locations, onSelectLocation, onClose }) => {
  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Select a Location</Modal.Header>
        <Modal.Body>
          <VStack space={4}>
            {locations.map((location, index) => (
              <Button 
                key={index} 
                onPress={() => onSelectLocation(location)}
              >
                {location.name}
              </Button>
            ))}
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default LocationPickerModal;
