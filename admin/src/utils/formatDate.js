export const formatDate = (date) => {
  if (!date) return 'Not selected';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};
