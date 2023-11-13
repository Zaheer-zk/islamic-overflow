import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const created = new Date(createdAt);

  const diffInMs = now.getTime() - created.getTime();
  const diffInSec = Math.floor(diffInMs / 1000);
  const diffInMin = Math.floor(diffInSec / 60);
  const diffInHours = Math.floor(diffInMin / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths =
    now.getMonth() -
    created.getMonth() +
    12 * (now.getFullYear() - created.getFullYear());
  const diffInYears = now.getFullYear() - created.getFullYear();

  if (diffInYears > 0) {
    return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
  } else if (diffInMonths > 0) {
    return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
  } else if (diffInDays > 0) {
    return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
  } else {
    return 'today';
  }
};

export function formatNumberWithSuffix(bigNumber: number): string {
  if (bigNumber >= 1000000) {
    return (bigNumber / 1000000).toFixed(1) + 'M';
  } else if (bigNumber >= 1000) {
    return (bigNumber / 1000).toFixed(1) + 'K';
  } else {
    return bigNumber.toString();
  }
}
