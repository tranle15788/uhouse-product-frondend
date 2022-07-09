export const checkPhoneNumber = (t) => {
  return [
    { type: 'required' },
    { type: 'min', value: 10 },
    { type: 'max', value: 15 },
    {
      type: 'custom',
      validator: () => ({
        validator(_, value) {
          if (!value || /^\+?\d+[-\s]?[0-9]+[-\s]?[0-9]+$/.test(value)) {
            return Promise.resolve();
          }
          return Promise.reject(t('columns.auth.register.Phone number Rule'));
        },
      }),
    },
  ];
};
