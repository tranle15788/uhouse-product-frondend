import { useNavigate } from 'react-router';
import { routerLinks } from 'utils';
import { convertTypeBuilding } from 'routes/admin/building/utils';

const Column = ({ t, setReloadTable, permissions }) => {
  const navigate = useNavigate();
  return [
    // name
    {
      name: 'name',
      title: t('columns.admin.buildingInfo.Building Name'),
      tableItem: {
        fixed: 'left',
        width: 150,
        sorter: true,
        onCell: (record) => ({
          style: { paddingTop: '0.25rem', paddingBottom: 0 },
          onClick: async () => {
            navigate(`${routerLinks('Building list')}/detail-${record.id}`);
          },
        }),
      },
      formItem: {
        rules: [
          {
            type: 'required',
            validator: () => ({
              validator(_, value) {
                if (
                  !value ||
                  /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ/,\s]+$/.test(
                    value,
                  )
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(t('components.form.ruleName'));
              },
            }),
          },
        ],
      },
    },

    // Room type
    {
      name: 'type',
      title: t('columns.admin.buildingInfo.Building Type'),
      tableItem: {
        width: 100,
        sorter: true,
        render: (text, record) => convertTypeBuilding(text, t),
      },

      formItem: {
        // col: 6,
        placeholder: t('columns.admin.buildingInfo.Building Type'),
        type: 'select',
        // className: "border-gray-400 border rounded-xl",
        rules: [{ type: 'required' }],
        list: [
          {
            value: 'MOTEL',
            label: t('columns.admin.buildingInfo.Motel'),
          },
          {
            value: 'HOTEL',
            label: t('columns.admin.buildingInfo.Hotel'),
          },
          {
            value: 'CHDV',
            label: t('columns.admin.buildingInfo.CHDV'),
          },
        ],
      },
    },
    // Address
    {
      name: 'address',
      title: t('columns.admin.buildingInfo.Address'),
      tableItem: {
        placeholder: t('columns.admin.buildingInfo.Address'),
        sorter: true,
        width: 300,
      },
      formItem: {
        placeholder: t('columns.admin.buildingInfo.Address'),
        rules: [],
      },
    },
    {
      name: 'address',
      title: t('columns.admin.buildingInfo.Address'),
      tableItem: {
        placeholder: t('columns.admin.buildingInfo.Address'),
        sorter: true,
        width: 300,
      },
      formItem: {
        placeholder: t('columns.admin.buildingInfo.Address'),
        rules: [],
      },
    },
  ];
};
export default Column;
