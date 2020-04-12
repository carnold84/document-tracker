import {format, parseISO} from 'date-fns';

export const formatISODate = timestamp => {
  return format(parseISO(timestamp), 'd MMMM yyyy');
};