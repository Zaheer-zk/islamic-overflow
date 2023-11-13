import QuestionCard from '@/components/card/QuestionCard';
import HomeFilters from '@/components/home/HomeFilters';
import NoResult from '@/components/shared/NoResult';
import Filters from '@/components/shared/search/Filters';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import Link from 'next/link';

const questions = [
  {
    _id: '1',
    title: 'The Significance of Ramadan in Islam',
    tags: [
      { _id: '1', name: 'Fasting' },
      { _id: '2', name: 'Ramadan' },
    ],
    author: {
      _id: '1',
      name: 'Zaheer Khan',
      picture: '/path/to/author-image.jpg',
    },
    upvotes: 4500000,
    views: 15000,
    answers: [],
    createdAt: new Date('2023-01-15T10:00:00.000Z'),
  },
  {
    _id: '2',
    title: 'The Significance of Ramadan in Islam',
    tags: [
      { _id: '1', name: 'Fasting' },
      { _id: '2', name: 'Ramadan' },
    ],
    author: {
      _id: '1',
      name: 'Zaheer Khan',
      picture: '/path/to/author-image.jpg',
    },
    upvotes: 45,
    views: 150,
    answers: [],
    createdAt: new Date('2023-01-15T10:00:00.000Z'),
  },
];

export default function Home() {
  return (
    <>
      <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='h1-bold text-dark100_light900'>All Questions</h1>
        <Link href='/ask-question' className='flex justify-end max-sm:w-full'>
          <Button className='primary-gradient inline-flex h-9 min-h-[46px] items-center justify-center rounded-md bg-slate-900 px-4 py-3 text-sm font-medium  shadow transition-colors hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus-visible:ring-slate-300'>
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearchBar
          route='/'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for questions...'
          otherClasses='flex-1'
        />
        <Filters
          filters={HomePageFilters}
          otherClasses='min-h-[56px] sm:min-w-[170px]'
          containerClasses='hidden max-md:flex'
        />
      </div>

      <HomeFilters />

      <div className='mt-10 flex w-full flex-col gap-6'>
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title='There are no question to show'
            description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡'
            link='/ask-question'
            linkTitle='Ask a Question'
          />
        )}
      </div>
    </>
  );
}
