export const mergeDeep = (
  targetObject: Record<string, any>,
  mergedObject: Record<string, any>,
) => {
  Object.keys(mergedObject).forEach((mergedObjectKey) => {
    const targetObjectValue = targetObject[mergedObjectKey];
    const mergedObjectValue = mergedObject[mergedObjectKey];

    if (!(targetObjectValue && mergedObjectValue)) return;

    typeof targetObjectValue === 'object'
      ? mergeDeep(targetObjectValue, mergedObjectValue)
      : Object.assign(targetObject, {
          [mergedObjectKey]: mergedObjectValue,
        });
  });

  return targetObject;
};
