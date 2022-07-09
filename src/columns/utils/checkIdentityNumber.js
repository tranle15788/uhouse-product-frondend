export const checkIdentityNumber = () => {
  return [{ type: 'required' }, { type: 'min', value: 8 }, { type: 'max', value: 44 }];
};
