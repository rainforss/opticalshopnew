export const transformToLocalizedObject = (obj: { [key: string]: any }) => {
  Object.keys(obj).forEach((key) => {
    obj[key] = { "en-US": obj[key] };
  });
  return obj;
};
