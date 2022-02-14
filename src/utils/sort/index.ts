/* eslint-disable no-prototype-builtins */
export const sortBy =
  (key: string, order = 'descending') =>
  (a: object, b: object) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    let comparison = 0;

    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === 'descending' ? comparison * -1 : comparison;
  };
