import { useTranslation } from 'react-i18next';
import { checkIdentityNumber, checkPhoneNumber, checkAddress, checkFullName } from '../utils';

const Column = () => {
  const { t } = useTranslation();

  return [
    // name
    {
      name: 'name',
      title: t('columns.auth.register.Fullname'),
      formItem: {
        placeholder: t('columns.auth.register.Fullname'),
        rules: checkFullName(),
      },
    },
    // email
    {
      name: 'email',
      title: t('columns.auth.register.Email'),
      formItem: {
        placeholder: t('columns.auth.register.Email'),
        rules: [{ type: 'required' }, { type: 'email' }],
      },
    },
    // password
    {
      name: 'password',
      title: t('columns.auth.register.Password'),
      formItem: {
        placeholder: t('columns.auth.register.Password'),
        type: 'password',
        rules: [
          {
            type: 'custom',
            validator: () => ({
              validator: async (rule, value) => {
                if (!!value && value.trim() !== '' && value.length >= 6) {
                  let countvalidator = 0;
                  if (/\s/.test(value)) return Promise.reject(t('components.form.rulePasswordNoWhiteSpace'));
                  else countvalidator++;
                  if (!/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*[a-z]).*$/.test(value))
                    return Promise.reject(t('components.form.rulePassword'));
                  else countvalidator++;
                  if (countvalidator === 2) return Promise.resolve();
                } else return Promise.resolve();
              },
            }),
          },
          { type: 'required' },
          { type: 'min', value: 6 },
        ],
      },
    },
    // dateOfBirth
    {
      name: 'dateOfBirth',
      title: t('columns.auth.register.Birth Date'),
      formItem: {
        col: 6,
        placeholder: t('columns.auth.register.Birth Date'),
        type: 'date',
        rules: [{ type: 'required' }],
        className: 'border-gray-400 border rounded-xl h-[42px]',
      },
    },
    // gender
    {
      name: 'gender',
      title: t('columns.auth.register.Gender'),
      formItem: {
        col: 6,
        placeholder: t('columns.auth.register.Gender'),
        type: 'select',
        rules: [{ type: 'required' }],
        // className: "border-gray-400 border rounded-xl h-[42px]",
        // className:"flex justify-center",
        // className:"border-gray-400 border rounded-xl",
        wrapClassName: 'ml-3 ',
        list: [
          {
            value: t('MALE'),
            label: t('columns.auth.register.Male'),
          },
          {
            value: t('FEMALE'),
            label: t('columns.auth.register.Female'),
          },
        ],
      },
    },
    // identityCard
    {
      name: 'identityCard',
      title: t('columns.auth.register.Identity Number'),
      formItem: {
        placeholder: t('columns.auth.register.Identity Number'),
        type: 'text',
        rules: checkIdentityNumber(),
      },
    },
    // phoneNumber
    {
      name: 'phoneNumber',
      title: t('columns.auth.register.Phone Number'),
      formItem: {
        placeholder: t('columns.auth.register.Phone Number'),
        rules: checkPhoneNumber(t),
      },
    },
    // address
    {
      name: 'address',
      title: t('columns.auth.register.Address'),
      formItem: {
        placeholder: t('columns.auth.register.Address'),
        rules: checkAddress(t),
      },
    },
  ];
};
export default Column;
