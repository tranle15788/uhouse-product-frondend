import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

const BreadCrumb = () => {
  const location = useLocation();
  // const params=useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const params_search = useRef(null);

  const [pathArr, setPathArr] = useState([]);
  useEffect(() => {
    let arr_temp = location.pathname.split('/');
    arr_temp = arr_temp.filter((ele) => ele !== '');
    setPathArr(arr_temp);
    const arr_params = location.search ? location.search.split('?')[1].split('&') : [];
    const arr_obj_params = {};
    arr_params.forEach((ele) => {
      const temp_rr = ele.split('=');
      arr_obj_params[temp_rr[0]] = temp_rr[1];
    });
    // attach link for breadcrumb with search params
    if (Array.isArray(arr_temp) && arr_temp[arr_temp.length - 1]?.includes('room')) params_search.current = '?tab=list';
    else if (Array.isArray(arr_temp) && arr_temp[arr_temp.length - 1]?.includes('contract'))
      params_search.current = `?tab=contract&subtab=${arr_obj_params?.type}`;
    else if (Array.isArray(arr_temp) && arr_temp[arr_temp.length - 1]?.includes('bill'))
      params_search.current = `?tab=bill&subtab=${arr_obj_params?.type}`;
    else if (Array.isArray(arr_temp) && arr_temp[arr_temp.length - 1]?.includes('notice'))
      params_search.current = `?tab=notice`;
    else params_search.current = '';
  }, [location.pathname]);

  return (
    <div className="text-base">
      <i className="las la-home text-3xl mr-2"></i>
      {pathArr.map((subpath, index) => {
        let text_T = subpath;
        const arr = subpath.split('-');
        if (arr.length - 1 > 0 && !isNaN(arr[arr.length - 1])) {
          arr.pop();
          text_T = arr.join('-');
        }
        const href = pathArr.filter((ele, i) => i <= index).join('/');
        return (
          <span
            key={index}
            onClick={() => {
              index < pathArr.length - 1 &&
                navigate(`${index === pathArr.length - 2 ? href + params_search.current : href}`);
            }}
            className={classNames(
              'cursor-pointer breadcrumb-link',
              index !== pathArr.length - 1 && 'hover:text-blue-400',
            )}
          >
            {text_T &&
              (t(`breadCrumb.${text_T}`) && t(`breadCrumb.${text_T}`).includes('breadCrumb')
                ? text_T
                : t(`breadCrumb.${text_T}`))}
            {index !== pathArr.length - 1 && <span className="text-gray-600 mx-1">{'>'}</span>}
          </span>
        );
      })}
    </div>
  );
};
export default BreadCrumb;
