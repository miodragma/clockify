export const mapQueryParams = params => {

  let queryString = '';
  let index = 0;

  params.forEach((value, key) => {
    if (!key) {
      return;
    }

    if (index === 0) {
      queryString += '?';
    }

    if (key instanceof Array) {
      for (let j = 0; j < key.length; j++) {
        const k = key[j];
        queryString += `${k}=${value}`;
        if (j !== key.length - 1 || index !== params.size - 1) {
          queryString += '&';
        }
      }
    } else {
      queryString += `${key}=${value}`;
      if (index !== params.size - 1) {
        queryString += '&';
      }
    }

    index++;
  });

  return queryString;
};
