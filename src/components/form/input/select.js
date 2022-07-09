import React, { useState, useEffect, useCallback } from 'react';
import { Select } from 'antd';
import axios from 'axios';

const Component = ({ formItem, placeholder, form, onChange, value, ...prop }) => {
  const [_list, set_list] = useState(formItem.list ? formItem.list : []);

  const loadData = useCallback(
    async (fullTextSearch) => {
      if (formItem.api) {
        if (!formItem.api.condition || formItem.api.condition(form.getFieldValue)) {
          const url = formItem.api.link(form.getFieldValue);
          if (url) {
            const { data } = await axios.get(url, {
              params: formItem.api.params
                ? formItem.api.params(form.getFieldValue, fullTextSearch, value)
                : { fullTextSearch },
            });
            set_list(data.data.map(formItem.api.format).filter((item) => !!item.value));
          }
        }
      } else if (formItem.renderList) {
        set_list(formItem.renderList(form.getFieldValue, fullTextSearch, formItem.list));
      } else if (formItem.list) {
        set_list(formItem.list.filter((item) => item.label.toUpperCase().indexOf(fullTextSearch.toUpperCase()) > -1));
      }
    },
    [form, formItem, value],
  );

  const initFunction = useCallback(async () => {
    if (formItem.list || formItem.api || formItem.renderList) {
      await loadData('');
    }
  }, [formItem, loadData]);

  useEffect(() => {
    initFunction();
  }, [value, initFunction]);

  return (
    <Select
      {...prop}
      filterOption={false}
      showSearch
      allowClear={true}
      onBlur={() => loadData('')}
      onSearch={(value) => loadData(value)}
      value={value || null}
      onChange={onChange}
      placeholder={placeholder}
      mode={formItem.mode}
      optionFilterProp="label"
      onSelect={formItem.onSelect}
      className={formItem.className}
      dropdownClassName={formItem.dropdownClassName}
      bordered={true}
      listHeight={200}
    >
      {formItem &&
        _list.map((item, index) => (
          <Select.Option key={`${item.value}${index}`} value={item.value}>
            {item.label}
          </Select.Option>
        ))}
    </Select>
  );
};

export default Component;
