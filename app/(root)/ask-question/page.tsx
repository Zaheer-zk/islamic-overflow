import Question from '@/components/form/Question';
import React from 'react';

const AskQuestion = () => {
  return (
    <div className='mx-auto w-full max-w-5xl'>
      <h1 className='h1-bold text-dark100_light900'>Ask a question</h1>
      <div className='mt-9'>
        <Question />
      </div>
    </div>
  );
};

export default AskQuestion;
