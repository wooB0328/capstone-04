import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { Card } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#bbd2ec',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 7,
  },
  number: {
    width: '20%',
  },
  userChoice: {
    width: '30%',
  },
  correctChoice: {
    color: 'blue',
  },
  incorrectChoice: {
    color: 'red',
  },
  answer: {
    width: '30%',
    color: 'blue',
  },
  explanationButton: {
    width: 60,
    height: 30,
    backgroundColor: '#838abd',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  explanationButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  score: {
    marginTop: 20,
    fontSize: 20,
  },
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  line: {
    borderBottomColor: '#838abd',
    borderBottomWidth: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  showButton: {
    width: 110,
    height: 25,
    margin: 5,
    backgroundColor: '#838abd',
    borderRadius: 5,
    justifyContent: 'center',
  },
  showButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

const PracticeResult = ({ route, navigation }) => {
  const { userChoices, problems, answers } = route.params; // 선택 답안
  const choicesArray = Object.entries(userChoices);
  const [showOnlyWrong, setShowOnlyWrong] = useState(false); // 오답만 보기 여부

  let totalScore = 100;

  // 뒤로가기 시 메인화면으로 이동
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Sidebar' }],
        });
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  // 틀린 문제의 인덱스를 0으로 설정
  let wrongIndexes = new Array(choicesArray.length).fill(1);
  choicesArray.forEach(([index, value], i) => {
    const answer = answers.find((answer) => answer.id === index);
    const problem = problems.find((problem) => problem.id === index);
    if (answer && problem && value != answer.data.answer) {
      totalScore -= problem.data.score;
      wrongIndexes[i] = 0;
    }
  });

  // 해설 버튼 클릭 시 이동
  const handleCommentary = (index) => {
    const answer = answers.find((answer) => answer.id === index);
    const problem = problems.find((problem) => problem.id === index);
    navigation.navigate('ProblemCommentary', {
      problem: problem,
      answer: answer,
    });
  };

  // 오답만 보기 여부
  const filteredData = showOnlyWrong
    ? choicesArray.filter((_, index) => wrongIndexes[index] === 0)
    : choicesArray;

  const renderItem = ({ item }) => {
    const [index, value] = item;
    const answer = answers.find((answer) => answer.id === index);

    // 틀린 문제만 보이는 경우
    if (showOnlyWrong && wrongIndexes[index] === 0) {
      return null;
    }

    return (
      <Card style={styles.card}>
        <View style={styles.listItem}>
          <View style={{ flexDirection: 'row', flex: 0.9 }}>
            <Text style={styles.number}>{`${parseInt(
              index.slice(-2)
            )}번`}</Text>
            <Text
              style={[
                styles.userChoice,
                wrongIndexes[parseInt(index.slice(-2)) - 1]
                  ? styles.correctChoice
                  : styles.incorrectChoice,
              ]}
            >
              {`선택: ${value}`}
            </Text>
            <Text style={styles.answer}>{`정답: ${
              answer ? answer.data.answer : '정답 정보 없음'
            }`}</Text>
          </View>
          <TouchableOpacity
            style={styles.explanationButton}
            onPress={() => handleCommentary(index)}
          >
            <Text style={styles.explanationButtonText}>해설</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>총점: {totalScore}</Text>
      <View style={styles.line} />

      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity
          style={styles.showButton}
          onPress={() => setShowOnlyWrong(!showOnlyWrong)}
        >
          <Text style={styles.showButtonText}>
            {showOnlyWrong ? '전부 표시' : '틀린 문제만 표시'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item[0]}
      />
    </View>
  );
};

export default PracticeResult;
