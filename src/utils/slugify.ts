// EXPLICATION : Fonction pour slugifier l'input des joueurs
const slugify = (input: string) => {
  const inputSlugified = input
    .replace(/\s/g, '') // This line removes all whitespace characters from the string. The \s is a regular expression (regex) that matches any whitespace character, and the g flag means it will replace all occurrences, not just the first one.
    .toLowerCase()
    .normalize('NFD') // This line normalizes the string to the Unicode Normalization Form D (NFD). In this form, combined characters like accented characters are decomposed into their base character and the combining character(s).
    .replace(/[\u0300-\u036f]/g, '') // This line removes all diacritic marks from the string. The regex [\u0300-\u036f] matches any character in the Unicode range from 0300 to 036F, which includes all combining diacritics. This is useful for removing accents from characters.
    .replace(/[^a-z0-9]/g, ''); // This line removes all characters that are not lowercase letters or numbers. The regex [^a-z0-9] matches any character that is not a lowercase letter (a-z) or a number (0-9). The ^ inside the brackets inverts the set, so it matches anything not in the set.
  return inputSlugified;
};

export default slugify;
