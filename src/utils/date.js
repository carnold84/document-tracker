import {format} from 'date-fns';

export const formatDate = timestamp => {
  return format(timestamp, 'd MMMM yyyy');
};