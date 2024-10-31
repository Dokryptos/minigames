import { Episode } from '@/types/episode';
import { ClueType } from '@/types/progress';

type LegacyElement = 'help' | 'objective' | ClueType;

const parseLegacyId = (id: string) => {
  const result = /box(\d)([a-z]+)(\d+)/.exec(id);
  if (!result) return;

  const [, boxId, elementType, elementId] = result;

  return {
    boxId: Number(boxId) as Episode['id'],
    elementType: elementType as LegacyElement,
    elementId: Number(elementId),
  };
};

export default parseLegacyId;
