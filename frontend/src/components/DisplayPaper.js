import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DisplayPage = () => {
  const { id } = useParams(); // Access the `id` from the URL params
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch the question data from your API using the `id`
      fetch(`http://localhost:5000/api/question-paper/question/${id}`)
        .then(response => response.json())
        .then(data => setQuestion(data))
        .catch(error => console.error("Error fetching question data:", error));
    }
  }, [id]); // The effect will run when the `id` changes

  if (!id) {
    return <div>Error: ID is missing from the URL!</div>;
  }

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Question Details</h2>
      <p><strong>Subject:</strong> {question.subject}</p>
      <p><strong>Module:</strong> {question.module}</p>
      <p><strong>Marks:</strong> {question.marks}</p>
      <p><strong>Description:</strong> {question.description}</p>
    </div>
  );
};

export default DisplayPage;
