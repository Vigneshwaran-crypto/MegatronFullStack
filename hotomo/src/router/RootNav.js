import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const navigate = (name, param) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, param);
  }
};
