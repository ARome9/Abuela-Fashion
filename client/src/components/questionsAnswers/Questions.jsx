import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import QuestionsContext from './QuestionsContext.js';
import Question from './Question.jsx';

export default function Questions({ questionsData, filteredData }) {
  // CONTEXT
  const { useFilteredData, setUseFilteredData } = useContext(QuestionsContext);

  // STATE
  const [showRemainingQs, setShowRemainingQs] = useState(false);

  // VARIABLES
  let initialQs, remainingQs;

  if (!useFilteredData) {
    initialQs = questionsData
      ?.slice(0, 4)
      .map(question => (
        <Question key={question.question_id} questionObj={question} />
      ))
      .sort(
        (a, b) =>
          b.props.questionObj.question_helpfulness -
          a.props.questionObj.question_helpfulness
      );
    remainingQs = questionsData
      ?.slice(4)
      .map(question => (
        <Question key={question.question_id} questionObj={question} />
      ))
      .sort(
        (a, b) =>
          b.props.questionObj.question_helpfulness -
          a.props.questionObj.question_helpfulness
      );
  } else {
    initialQs = filteredData
      ?.slice(0, 4)
      .map(question => (
        <Question key={question.question_id} questionObj={question} />
      ))
      .sort(
        (a, b) =>
          b.props.questionObj.question_helpfulness -
          a.props.questionObj.question_helpfulness
      );
    remainingQs = filteredData
      ?.slice(4)
      .map(question => (
        <Question key={question.question_id} questionObj={question} />
      ))
      .sort(
        (a, b) =>
          b.props.questionObj.question_helpfulness -
          a.props.questionObj.question_helpfulness
      );
  }

  const showRemainingQsCondition =
    (questionsData.length !== 0 && !useFilteredData) ||
    (filteredData.length !== 0 && useFilteredData);

  const showMoreAnsweredQsCondition =
    (questionsData?.length > 4 && !useFilteredData) ||
    (filteredData.length !== 0 && useFilteredData);

  return (
    <Container>
      {initialQs?.length > 0 && initialQs}
      {showMoreAnsweredQsCondition && !showRemainingQs ? (
        <MoreAnsweredQsBtn onClick={() => setShowRemainingQs(true)}>
          More Answered Questions
        </MoreAnsweredQsBtn>
      ) : null}
      {showRemainingQs && showRemainingQsCondition ? remainingQs : null}

      {/* {console.log('INITIAL QS: ', initialQs)}
      {console.log('REMAINING QS: ', remainingQs)}
      {console.log('FILTERED DATA: ', filteredData)}
      {console.log('QUESTIONS DATA: ', questionsData)} */}
    </Container>
  );
}

const Container = styled.div``;

const MoreAnsweredQsBtn = styled.button``;
