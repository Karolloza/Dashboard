export const getColumnValue = (data, prop) => {
  if (!prop) return null;
  let result = data;
  const propArray = prop.split(".");
  propArray.forEach((p, index) => {
    if (result) {
      result = result[p];
    } else {
      return result;
    }
  });

  return result;
};

export const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
