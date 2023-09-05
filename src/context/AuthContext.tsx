// import axios from 'axios';
// import {ReactNode, createContext, useEffect, useState} from 'react';
// import {getToken, saveTokenToMMKV} from '../utils/storage';
// import {useNavigation} from '@react-navigation/native';

import {ReactNode, createContext, useEffect, useState} from 'react';
import {getAuthfFromMMKV, saveAuthToMMKV} from '../utils/storage';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

interface AuthUser {
  email: string;
  accessToken: string;
  refreshToken: string;
}

// interface AuthContextType {
//   user: User | null;
//   tokens: Tokens | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   refreshAccessToken: () => Promise<void>;
// }

// interface User {
//   email: string;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(
//   undefined,
// );

// export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [tokens, setTokens] = useState<Tokens | null>(null);
//   const api = axios.create({
//     baseURL: process.env.BASE_URL,
//     timeout: 5000,
//   });
//   const navigation = useNavigation();

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await api.post('/auth/login', {
//         email,
//         password,
//       });

//       if (response.status >= 200 && response.status < 300) {
//         const {accessToken, refreshToken} = response.data;
//         setTokens({accessToken, refreshToken});
//         setUser({email});
//         navigation.navigate('Home');
//       } else {
//         console.error('Login failed');
//       }
//     } catch (error) {
//       console.error('Login failed', error);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setTokens(null);
//     navigation.navigate('Login');
//   };

//   const refreshAccessToken = async () => {
//     if (!tokens || !tokens.refreshToken) {
//       return;
//     }

//     try {
//       const response = await api.post('/auth/refresh-token', {
//         refresh_token: tokens.refreshToken,
//       });

//       if (response.status >= 200 && response.status < 300) {
//         const {accessToken} = await response.data;
//         setTokens((prevTokens: Tokens | any) => ({
//           ...prevTokens,
//           accessToken: accessToken,
//         }));
//       } else {
//         console.log('Refresh token failed');
//       }
//     } catch (error) {
//       console.log('Refresh token failed', error);
//     }
//   };

//   useEffect(() => {
//     const fetchTokensFromStorage = async () => {
//       const accessToken = await getToken('access_token');
//       const refreshToken = await getToken('refresh_token');
//       console.log('test');

//       if (accessToken && refreshToken) {
//         setTokens({
//           accessToken,
//           refreshToken,
//         });
//       }
//     };

//     fetchTokensFromStorage();
//   }, []);

//   useEffect(() => {
//     const refreshTimer = setInterval(refreshAccessToken, 50 * 60 * 1000);
//     return () => clearInterval(refreshTimer);
//   }, [tokens]);

//   return (
//     <AuthContext.Provider
//       value={{user, tokens, login, logout, refreshAccessToken}}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// Create a context
const AuthContext = createContext({});

// const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
//   const [auth, setAuthState] = useState({});

//   // Get current auth state from AsyncStorage
//   const getAuthState = async () => {
//     try {
//       const authDataString = await getAuthfFromMMKV();
//       const authData: AuthUser = JSON.parse(authDataString!);
//       // Configure axios headers
//       configureAxiosHeaders(
//         authData.email,
//         authData.accessToken,
//         authData.refreshToken,
//       );
//       setAuthState(authData);
//     } catch (err) {
//       setAuthState({});
//     }
//   };

//   // Update AsyncStorage & context state
//   const setAuth = async (auth: AuthUser) => {
//     try {
//       await saveAuthToMMKV('auth', JSON.stringify(auth));
//       // Configure axios headers
//       configureAxiosHeaders(auth.email, auth.accessToken, auth.refreshToken);
//       setAuthState(auth);
//     } catch (error) {
//       Promise.reject(error);
//     }
//   };

//   useEffect(() => {
//     getAuthState();
//   }, []);

//   return (
//     <AuthContext.Provider value={{auth, setAuth}}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export {AuthContext, AuthProvider};

// function configureAxiosHeaders(
//   email: string,
//   access_token: string,
//   refresh_token: string,
// ) {
//   axios.defaults.headers['X-Auth-Email'] = email;
//   axios.defaults.headers['X-Auth-Access-Token'] = access_token;
//   axios.defaults.headers['X-Auth-Refresh-Token'] = refresh_token;
// }

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState<AuthUser | null>(null);
  const api = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 5000,
  });
  const navigation = useNavigation();

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email: string, password: string) => {
          try {
            const response = await api.post('/auth/login', {
              email,
              password,
            });

            if (response.status >= 200 && response.status < 300) {
              const {accessToken, refreshToken} = response.data;
              setTokens({accessToken, refreshToken, email});
            } else {
              console.error('Login failed');
            }
          } catch (error) {
            console.error('Login failed', error);
          }
        },
        googleLogin: async () => {
          try {
            const {idToken} = await GoogleSignin.signIn();

            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);

            await auth().signInWithCredential(googleCredential);
          } catch (error) {
            console.log({error});
          }
        },
        fbLogin: async () => {
          try {
            const result = await LoginManager.logInWithPermissions([
              'public_profile',
              'email',
            ]);

            if (result.isCancelled) {
              throw 'User cancelled the login process';
            }

            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
              throw 'Something went wrong obtaining access token';
            }

            const facebookCredential = auth.FacebookAuthProvider.credential(
              data.accessToken,
            );

            await auth()
              .signInWithCredential(facebookCredential)
              .catch(error => {
                console.log('Something went wrong with sign up: ', error);
              });
          } catch (error) {
            console.log({error});
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
