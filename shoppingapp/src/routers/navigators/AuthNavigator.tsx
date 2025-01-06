import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeAuth, Login} from '../../screens';
import Register from '../../screens/auth/Register';
import ForgotPassword from '../../screens/auth/ForgotPassword';
import VerificationCode from '../../screens/auth/VerificationCode';
import EnterNewPassword from '../../screens/auth/EnterNewPassword';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeAuth" component={HomeAuth} />
      <Stack.Screen name="VerificationCode" component={VerificationCode} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="EnterNewPassword" component={EnterNewPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
