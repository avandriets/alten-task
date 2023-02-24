export const removeFalsyValues = (obj: any) => {
  return Object.keys(obj).reduce((acc: any, o) => {

    if (obj[o] !== null && obj[o] !== undefined) {
      acc[o] = obj[o];
    }

    return acc;
  }, { });
};

export const removeEmptyValues = (obj: any) => {

  return Object.keys(obj).reduce((acc: any, o) => {

    if (obj[o]) {
      acc[o] = obj[o];
    }

    return acc;
  }, { });
};
