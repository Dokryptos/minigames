export const slugifyNumbers = (input: string) => {
  const inputSlugified = input
    .replace(/\s/g, '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^0-9]/g, '');
  return inputSlugified;
};

export default slugifyNumbers;
