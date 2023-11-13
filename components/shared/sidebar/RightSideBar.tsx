import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Tags from '../navbar/Tags';

const RightSideBar = () => {
  // Dummy data for questions
  // #TODO: fetch data from server
  const hotQuestions = [
    {
      _id: 1,
      title: 'Understanding the Five Pillars of Islam: An In-depth Discussion',
    },
    {
      _id: 2,
      title: 'The Historical Significance of the Prophet Muhammad’s Life',
    },
    {
      _id: 3,
      title:
        'Exploring the Rich Cultural Heritage of Islamic Art and Architecture',
    },
    {
      _id: 4,
      title: 'The Role of the Quran in Contemporary Islamic Practices',
    },
    {
      _id: 5,
      title: 'Interpreting Islamic Law: Balancing Tradition and Modernity',
    },
  ];

  const popularTags = [
    { _id: 1, name: 'Quranic Studies', totalQuestions: 120 },
    { _id: 2, name: 'Islamic History', totalQuestions: 95 },
    { _id: 3, name: 'Halal Lifestyle', totalQuestions: 78 },
    { _id: 4, name: 'Islamic Jurisprudence', totalQuestions: 103 },
    { _id: 5, name: 'Prophetic Traditions', totalQuestions: 89 },
  ];
  return (
    <section className='custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden'>
      <div>
        <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
        <div className='mt-7 flex w-full flex-col gap-[30px]'>
          {hotQuestions.map((question) => {
            return (
              <Link
                href={`questions/${question._id}`}
                key={question._id}
                className='flex cursor-pointer items-center justify-between gap-7'
              >
                <p className='body-medium text-dark500_light700'>
                  {question.title}
                </p>
                <Image
                  src='/assets/icons/chevron-right.svg'
                  alt='Chevron right icon'
                  className='invert-colors text-transparent'
                  width={20}
                  height={20}
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className='mt-16'>
        <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
        <div className='mt-7 flex flex-col gap-4'>
          {popularTags.map((tag) => {
            return (
              <Tags
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.totalQuestions}
                showCount={true}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
