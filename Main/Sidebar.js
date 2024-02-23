import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedIn, setUserEmail, setIsWeb } from '../state';
import { Text, View, Alert, Platform, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerToggleButton,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import SideScreen from './side';
import Statistics from './statistics';
import Planner from './planner';
import Login from './login';
import CreateId from './createId';
import HomeScreen from './HomeScreen';

import BoardScreen from '../Board/BoardScreen';
import BoardScreenWeb from '../Board/BoardScreenWeb';
import PracticeRoundSelect from '../Practice/PracticeRoundSelect';
import QuizGame from '../Game/QuizGame';

import TypeProblem from '../Problem/TypeProblem';
import KillerProblem from '../Problem/KillerProblem';
import WrongProblem from '../Problem/WrongProblem';
import DictionaryStack from '../Problem/Dictionary';

import HistoryTalesScreen from '../HistoryVideo/HistoryTalesScreen';
import LikedVideosScreen from '../HistoryVideo/LikedVideosScreen';

const Drawer = createDrawerNavigator();
const CustomBackButton = ({ navigation }) => {
  const route = useRoute();
  const handlePress = () => {
    if (route.name === '회원가입') {
      navigation.navigate('로그인');
    } else {
      navigation.goBack();
    }
  };
  return (
    <TouchableOpacity style={{ marginLeft: 10 }} onPress={handlePress}>
      <MaterialIcons name="arrow-back" size={30} color="black" />
    </TouchableOpacity>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>
          로그인 정보
        </Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default function Sidebar({ navigation }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userEmail = useSelector((state) => state.userEmail);
  const userAgent = navigator.userAgent || navigator.vendor;
  const isWeb = useSelector((state) => state.isWeb);

  useEffect(() => {
    dispatch(
      // 앱/웹 구분
      setIsWeb(Platform.OS === 'web')
    );
  }, []);

  const handleLogin = (email) => {
    dispatch(setUserEmail(email));
    dispatch(setLoggedIn(true));
  };
  const navigationRef = useRef();

  const handleLogout = () => {
    dispatch(setUserEmail(null));
    dispatch(setLoggedIn(false));
    if (isWeb) {
      localStorage.removeItem('email');
      console.log("머징");
    }
    if (navigationRef.current) {
      navigationRef.current.navigate('HomeScreen');
    }
  };

  useEffect(() => {
    if (isLoggedIn && navigationRef.current) {
      navigationRef.current.navigate('HomeScreen');
    }
  }, [isLoggedIn]);

  const handleLogoutButtonPress = () => {
    if (Platform.OS === 'web') {
      handleLogout();
    } else {
      Alert.alert(
        '로그아웃',
        '로그아웃 하시겠습니까?',
        [
          {
            text: '예',
            onPress: () => handleLogout(), // Yes를 누르면 로그아웃 함수를 호출합니다.
          },
          {
            text: '아니요',
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <Drawer.Navigator
      drawerType="front"
      screenOptions={({ navigation }) => ({
        headerTitleAlign: 'center',
        drawerPosition: 'right',
        headerLeft: () => <CustomBackButton navigation={navigation} />,
        headerRight: () => <DrawerToggleButton />,
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons name="home" size={19} color="black" />
          ),
          drawerLabel: ({ focused, color }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: -26,
              }}
            >
              <Text
                style={{
                  color: focused ? 'blue' : 'black',
                  fontSize: 16,
                  marginBottom: 3,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="기출문제"
        component={PracticeRoundSelect}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons
              name="format-list-numbered"
              size={19}
              color="black"
            />
          ),
          drawerLabel: ({ focused, color }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: -26,
              }}
            >
              <Text
                style={{
                  color: focused ? 'blue' : 'black',
                  fontSize: 16,
                  marginBottom: 3,
                }}
              >
                기출문제
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="시대별 풀이"
        component={() => (
          <TypeProblem
            param={'era'}
            isLoggedIn={isLoggedIn}
            userEmail={userEmail}
          />
        )}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons name="access-time-filled" size={19} color="black" />
          ),
          drawerLabel: ({ focused, color }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: -26,
              }}
            >
              <Text
                style={{
                  color: focused ? 'blue' : 'black',
                  fontSize: 16,
                  marginBottom: 3,
                }}
              >
                시대별 풀이
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="유형별 풀이"
        component={() => (
          <TypeProblem
            param={'type'}
            isLoggedIn={isLoggedIn}
            userEmail={userEmail}
          />
        )}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons name="account-balance" size={19} color="black" />
          ),
          drawerLabel: ({ focused, color }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: -26,
              }}
            >
              <Text
                style={{
                  color: focused ? 'blue' : 'black',
                  fontSize: 16,
                  marginBottom: 3,
                }}
              >
                유형별 풀이
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="킬러문제"
        component={KillerProblem}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons name="do-not-disturb-on" size={19} color="black" />
          ),
          drawerLabel: ({ focused, color }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: -26,
              }}
            >
              <Text
                style={{
                  color: focused ? 'blue' : 'black',
                  fontSize: 16,
                  marginBottom: 3,
                }}
              >
                킬러문제
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="오답노트"
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons name="menu-book" size={19} color="black" />
          ),
          drawerLabel: ({ focused, color }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: -26,
              }}
            >
              <Text
                style={{
                  color: focused ? 'blue' : 'black',
                  fontSize: 16,
                  marginBottom: 3,
                }}
              >
                오답노트
              </Text>
            </View>
          ),
        }}
      >
        {(props) =>
          isLoggedIn ? (
            <WrongProblem userEmail={userEmail} />
          ) : (
            <Login {...props} onLogin={handleLogin} />
          )
        }
      </Drawer.Screen>
      <Drawer.Screen
        name="플래너"
        component={Planner}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons name="timer" size={19} color="black" />
          ),
          drawerLabel: ({ focused, color }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: -26,
              }}
            >
              <Text
                style={{
                  color: focused ? 'blue' : 'black',
                  fontSize: 16,
                  marginBottom: 3,
                }}
              >
                플래너
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="통계"
        component={Statistics}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons name="auto-graph" size={19} color="black" />
          ),
          drawerLabel: ({ focused, color }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: -26,
              }}
            >
              <Text
                style={{
                  color: focused ? 'blue' : 'black',
                  fontSize: 16,
                  marginBottom: 3,
                }}
              >
                통계
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="채점하기"
        component={SideScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons
              name="check-circle-outline"
              size={19}
              color="black"
            />
          ),
          drawerLabel: ({ focused, color }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: -26,
              }}
            >
              <Text
                style={{
                  color: focused ? 'blue' : 'black',
                  fontSize: 16,
                  marginBottom: 3,
                }}
              >
                채점하기
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
          name="역사이야기"
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons name="play-circle-filled" size={19} color="black" />
            ),
            drawerLabel: ({ focused, color }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -26 }}>
                <Text style={{ color: focused ? 'blue' : 'black', fontSize: 16, marginBottom: 3, }}>
                  역사이야기
                </Text>
              </View>
            ),
          }}
        >
          {props => <HistoryTalesScreen {...props} isLoggedIn={isLoggedIn} userEmail={userEmail} />}
        </Drawer.Screen>

      <Drawer.Screen
        name="즐겨 찾는 영상"
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons name="star" size={24} color="black" />
          ),
          drawerLabel: ({ focused, color }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -26 }}>
              <Text style={{ color: focused ? 'blue' : 'black', fontSize: 16, marginBottom: 3, }}>
                즐겨찾는 영상
              </Text>
            </View>
          ),
        }}
      >
        {props => <LikedVideosScreen {...props} isLoggedIn={isLoggedIn} userEmail={userEmail} />}
      </Drawer.Screen>


      <Drawer.Screen
        name="게시판"
        component={BoardScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons name="speaker-notes" size={19} color="black" />
          ),
          drawerLabel: ({ focused, color }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: -26,
              }}
            >
              <Text
                style={{
                  color: focused ? 'blue' : 'black',
                  fontSize: 16,
                  marginBottom: 3,
                }}
              >
                게시판
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="게임"
        component={QuizGame}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons name="videogame-asset" size={19} color="black" />
          ),
          drawerLabel: ({ focused, color }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: -26,
              }}
            >
              <Text
                style={{
                  color: focused ? 'blue' : 'black',
                  fontSize: 16,
                  marginBottom: 3,
                }}
              >
                게임
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="용어사전"
        component={DictionaryStack}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons name="videogame-asset" size={19} color="black" />
          ),
          drawerLabel: ({ focused, color }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: -26,
              }}
            >
              <Text
                style={{
                  color: focused ? 'blue' : 'black',
                  fontSize: 16,
                  marginBottom: 3,
                }}
              >
                용어사전
              </Text>
            </View>
          ),
        }}
      />
      {!isLoggedIn && (
        <Drawer.Screen
          name="로그인"
          options={({ route }) => ({
            drawerLabel: () => {
              return <Text>로그인</Text>;
            },
          })}
        >
          {(props) => <Login {...props} onLogin={handleLogin} />}
        </Drawer.Screen>
      )}

      {isLoggedIn && (
        <Drawer.Screen
          name="로그아웃"
          options={({ route }) => ({
            drawerLabel: () => {
              return <Text onPress={handleLogoutButtonPress}>로그아웃</Text>;
            },
            headerShown: false,
          })}
        >
          {() => {
            return null;
          }}
        </Drawer.Screen>
      )}

      {!isLoggedIn && (
        <Drawer.Screen name="회원가입" component={CreateId} />
      )}
    </Drawer.Navigator>
  );
}
