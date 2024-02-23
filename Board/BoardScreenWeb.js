import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PostCreate from './PostCreate';
import PostDetail from './PostDetail';
import BoardScreenUI from './BoardScreenUI';

const QuestionBoard = ({ match }) => (
  <BoardScreenUI boardName="questionBoard" title="질문 게시판" />
);

const StudyTipBoard = ({ match }) => (
  <BoardScreenUI boardName="tipBoard" title="공부 팁 게시판" />
);

const ExamReviewBoard = ({ match }) => (
  <BoardScreenUI boardName="reviewBoard" title="시험 후기 게시판" />
);

const BoardScreenWeb = () => (
  <>
    <div>test</div>
  </>
);

export default BoardScreenWeb;
