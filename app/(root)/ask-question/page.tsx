import Question from '@/components/form/Question';
import { getUserById } from '@/lib/actions/user.action';
// import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

const AskQuestion = async () => {
  // const { userId } = auth();

  const userId = 'clerk12345';

  if (!userId) {
    redirect('/sign-in');
  }

  const mongoUser = await getUserById({ userId });
  console.log('mongoUser: ', mongoUser);

  return (
    <div className='mx-auto w-full max-w-5xl'>
      <h1 className='h1-bold text-dark100_light900'>Ask a question</h1>
      <div className='mt-9'>
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default AskQuestion;
