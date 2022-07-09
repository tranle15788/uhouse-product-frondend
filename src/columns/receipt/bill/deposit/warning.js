const Column = ({ t }) => {
  return [
    // Building
    {
      name: 'building',
      title: t('columns.admin.building.Building'),
      formItem: {
        readOnly: true,
      },
    },
  ];
};
export default Column;
