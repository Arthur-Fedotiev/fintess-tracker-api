import { BadRequestException } from '../models/error/bad-request';
import { isObject } from './is-object';

export const mergeDeep = (
  targetObject: Record<string, any>,
  mergedObject: Record<string, any>,
) => {
  if (!(isObject(targetObject) && isObject(mergedObject))) {
    throw new BadRequestException('Target and source must be simple objects');
  }

  Object.keys(mergedObject).forEach((mergedObjectKey) => {
    const targetObjectValue = targetObject[mergedObjectKey];
    const mergedObjectValue = mergedObject[mergedObjectKey];

    if (!(targetObjectValue && mergedObjectValue)) return;

    isObject(targetObjectValue)
      ? mergeDeep(targetObjectValue, mergedObjectValue)
      : Object.assign(targetObject, {
          [mergedObjectKey]: mergedObjectValue,
        });
  });

  return targetObject;
};
