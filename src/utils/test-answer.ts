import { distance } from 'fastest-levenshtein';
import slugify from './slugify';

const MAX_DISTANCE = 2;

/**
 * Checks if the given answer matches any of the accepted answers.
 * @param answer - The answer to test.
 * @param accepts - An array of accepted answers.
 * @param maxDistance - The maximum "distance"/tolerance allowed between the answer and the accepted answers.
 * @returns `true` if the answer matches any of the accepted answers, `false` otherwise.
 */
function testAnswer(answer: string, accepts: string[], maxDistance: number = MAX_DISTANCE) {
  return accepts.find((accept) => {
    const answerSlug = slugify(answer);

    return answerSlug.length > maxDistance
      ? distance(accept, answerSlug) <= maxDistance
      : accept === answerSlug;
  });
}

export default testAnswer;
