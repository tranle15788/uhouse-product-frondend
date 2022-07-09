export const checkFullName = (value) => {
  return [{ type: 'required' }, { type: 'text' }, { type: 'max', value: 100 }, { type: 'min', value: 3 }];
};
