import React from 'react';
import Tags from '../shared/navbar/Tags';
import Link from 'next/link';
import ShowStacksData from '../shared/ShowStacksData';
import { formatNumberWithSuffix, getTimestamp } from '@/lib/utils';

interface Props {
  _id: string;
  title: string;
  tags: { _id: string; name: string }[];
  author: { _id: string; name: string; picture: string };
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: Props) => {
  const askedData = getTimestamp(createdAt);

  return (
    <div className='card-wrapper rounded-[10px] p-9 sm:px-11'>
      <div className='flex flex-col-reverse justify-between gap-5 sm:flex-row'>
        <div>
          <span className='subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden'>
            {askedData}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className='text-dark200_light900 sm:h3-semibold base-semibold'>
              {title}
            </h3>
          </Link>
        </div>
        {/* add a edit button for the author */}
      </div>
      <div className='mt-3.5 flex flex-wrap gap-2'>
        {tags.map((tag) => (
          <Tags key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className='flex-between mt-6 w-full flex-wrap gap-3'>
        <ShowStacksData
          imgUrl='/assets/icons/avatar.svg'
          alt='Avatar'
          href={`/profile/${author._id}`}
          value={author.name}
          title={` - asked ${askedData}`}
          isAuthor={true}
          textStyles='small-medium text-dark400_light800'
        />
        <ShowStacksData
          imgUrl='/assets/icons/like.svg'
          alt='Upvotes'
          value={formatNumberWithSuffix(upvotes)}
          title='Votes'
          textStyles='small-medium text-dark400_light800'
        />
        <ShowStacksData
          imgUrl='/assets/icons/message.svg'
          alt='Answers'
          value={answers.length}
          title='Answers'
          textStyles='small-medium text-dark400_light800'
        />
        <ShowStacksData
          imgUrl='/assets/icons/eye.svg'
          alt='eye'
          value={formatNumberWithSuffix(views)}
          title='Views'
          textStyles='small-medium text-dark400_light800'
        />
      </div>
    </div>
  );
};

export default QuestionCard;
