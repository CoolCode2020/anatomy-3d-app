// src/hooks/useQuiz.js
import { useState, useEffect } from 'react';

export function useQuiz() {
  const [options, setOptions] = useState([]);
  const [correctBone, setCorrectBone] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadQuiz = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/bones/4randomQuiz');
      const data = await res.json();
      setOptions(data.options);
      setCorrectBone(data.correctBone);
      setSelectedAnswer(null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  const answer = (ans) => {
    setSelectedAnswer(ans);
    setTimeout(loadQuiz, 1000);
  };

  return {
    options,
    correctBone,
    selectedAnswer,
    isLoading,
    error,
    answer,
  };
}