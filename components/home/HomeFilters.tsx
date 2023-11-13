import { HomePageFilters } from '@/constants/filters';
import React from 'react';
import { Button } from '../ui/button';

const HomeFilters = () => {
  const activeFilter = '';
  return (
    <div className='mt-10 hidden flex-wrap gap-3 md:flex'>
      {HomePageFilters.map((filter) => {
        return (
          <Button
            key={filter.value}
            className={`body-medium rounded-lg px-6 py-3 capitalize text-light-500 shadow-none ${
              activeFilter === filter.value
                ? 'bg-primary-100 text-primary-500'
                : 'bg-light-800 text-light-500'
            }`}
          >
            {filter.name}
          </Button>
        );
      })}
    </div>
  );
};

export default HomeFilters;
