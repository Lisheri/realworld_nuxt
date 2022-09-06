export const getMonthAsEng = (time: string) => {
  const currentMonth = new Date(time).getMonth() + 1;
  switch (currentMonth) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';
    default:
      return 'January';
  }
};

export const getDay = (time: string) => {
  const curDay = new Date(time).getDate();
  if (curDay === 1) return `1st`;
  if (curDay === 2) return '2nd';
  if (curDay === 3) return '3rd';
  return `${curDay}th`;
}

export const getYear = (time: string) => {
  return  new Date(time).getFullYear();
}
