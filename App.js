import React, { useEffect } from 'react';
import { LogBox} from 'react-native';
import { Provider } from 'react-redux';
import store from './state';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux'; // useSelector import 추가
import { setUserEmail, setLoggedIn } from './state';

// 메인 화면
import Sidebar from './Main/Sidebar';
import SideScreen from './Main/side';
import Statistics from './Main/statistics';
import Planner from './Main/planner';
import Login from './Main/login';
import CreateId from './Main/createId';
import HomeScreen from './Main/HomeScreen';

// 게시판
import BoardScreen from './Board/BoardScreen';

// 기출 문제
import PracticeRoundSelect from './Practice/PracticeRoundSelect';
import ProblemDetail from './Practice/ProblemDetail';
import PracticeResult from './Practice/PracticeResult';
import ProblemCommentary from './Practice/ProblemCommentary';

// 퀴즈 게임
import QuizGame from './Game/QuizGame';
import UnsolvedScreen from './Game/UnsolvedScreen';

// 네비게이터
const Stack = createStackNavigator();
const screens = [
  {
    name: 'Sidebar',
    component: Sidebar,
    options: { headerShown: false },
  },
  {
    name: 'SideScreen',
    component: SideScreen,
    options: { headerShown: false },
  },
  {
    name: 'Statistics',
    component: Statistics,
    options: { headerShown: false },
  },
  { name: 'Planner', component: Planner, options: { headerShown: false } },
  { name: 'Login', component: Login },
  { name: 'CreateId', component: CreateId, options: { headerShown: false } },
  {
    name: 'HomeScreen',
    component: HomeScreen,
  },
  {
    name: 'BoardScreen',
    component: BoardScreen,
    options: { headerShown: false },
  },
  {
    name: 'PracticeRoundSelect',
    component: PracticeRoundSelect,
    options: { headerShown: false },
  },
  {
    name: 'ProblemDetail',
    component: ProblemDetail,
    options: { headerShown: false },
  },
  {
    name: 'PracticeResult',
    component: PracticeResult,
    options: { headerShown: false },
  },
  {
    name: 'ProblemCommentary',
    component: ProblemCommentary,
    options: { headerShown: false },
  },
  { name: 'QuizGame', component: QuizGame, options: { headerShown: false } },
  {
    name: 'UnsolvedScreen',
    component: UnsolvedScreen,
    options: { headerShown: false },
  },
];
LogBox.ignoreLogs(['Warning: ...']); // 경고창 안뜨게 하기

const App = () => {
  const isWeb = useSelector((state) => state.isWeb);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isWeb) {
      const email = localStorage.getItem('email');
      if (email) {
        dispatch(setUserEmail(email));
        dispatch(setLoggedIn(true));
      }
    }
  }, [isWeb]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isWeb ? 'HomeScreen' : 'Sidebar'}>
        {screens.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={screen.options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
