export const replacer = (key, value) => {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from([...value])
    };
  } else {
    return value;
  }
};
