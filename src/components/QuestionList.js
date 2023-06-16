import React from 'react';
import QuestionItem from './QuestionItem';

function QuestionList({ questions, setQuestions }) {
  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  function handleAnswerChange(selection, id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex: selection }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((question) => {
          if (question.id === id) return updatedQuestion;
          return questions;
        });
        setQuestions(updatedQuestions);
      });
  }

  const questionMap = questions.map((question) => (
    <QuestionItem
      key={question.id}
      onAnswerChange={handleAnswerChange}
      onDeleteClick={handleDeleteClick}
      question={question}
    />
  ));
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionMap}</ul>
    </section>
  );
}

export default QuestionList;
