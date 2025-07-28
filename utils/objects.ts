export const hasChanged = (
  obj1: Record<string, any>,
  obj2: Record<string, any>
) => {
  return Object.keys(obj1).some((key) => obj1[key] !== obj2[key]);
};
