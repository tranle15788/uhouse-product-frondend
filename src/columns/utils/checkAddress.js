export const checkAddress = (t) => {
  return [
    {
      type: 'custom',
      validator: () => ({
        validator(_, value) {
          if (
            !value ||
            /^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s,.'/]+$/.test(
              value,
            )
          ) {
            return Promise.resolve();
          }
          return Promise.reject(t('columns.auth.register.Address Rule'));
        },
      }),
    },
  ];
};
