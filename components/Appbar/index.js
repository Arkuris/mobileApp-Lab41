import { StatusBar, IconButton, Box, HStack, Icon } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

function AppBar({ onMoreVertPress }) {
  return <>
    <StatusBar bg="#3700B3" barStyle="light-content" />
    <Box bg="grey" />
    <HStack bg="grey" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
      <IconButton icon={<Icon as={MaterialIcons} name="favorite" size="sm" color="white" />} />
      <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} />
      <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} 
      onPress={onMoreVertPress}
      />
    </HStack>
  </>;
}

export default AppBar;
