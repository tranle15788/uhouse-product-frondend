import { Collapse } from 'components';
import React, { Fragment } from 'react';
import classNames from 'classnames';
import { routerLinks } from 'utils';
import { useNavigate, useLocation } from 'react-router';
import './index.less';
import listMenu from '../menus';
import { useAuth } from '../../../global';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Layout = ({ isCollapsed = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const { menu } = useAuth();
  return menu ? (
    <ul className="menu">
      {listMenu()
        .filter((item) => menu.filter((subItem) => subItem.pageUrl === routerLinks(item.name)).length)
        .map((item, index) => {
          if (!item.child) {
            const id = item.name.split(' ').join('') + 'id';

            return (
              <li
                key={index}
                id={id}
                className={classNames('flex items-center px-3 py-1 m-3', {
                  'bg-white text-red-500 rounded-2xl': location.pathname === routerLinks(item.name),
                  'text-white': location.pathname !== routerLinks(item.name),
                })}
                onClick={() => navigate(routerLinks(item.name))}
              >
                <i className={classNames('text-3xl mr-2.5', item.icon)} />
                <span
                  className={classNames('transition-all duration-300 ease-in-out font-bold', {
                    'opacity-100': !isCollapsed,
                    'opacity-0 text-[0]': isCollapsed,
                  })}
                >
                  {t(`layout.${item.name}`)}
                </span>
              </li>
            );
          } else {
            return (
              <Collapse
                key={index}
                title={
                  <Fragment>
                    <i className={classNames('text-3xl mr-2.5', item.icon)} />
                    <span
                      className={classNames('transition-all duration-300 ease-in-out font-bold', {
                        'opacity-100': !isCollapsed,
                        'opacity-0 text-[0]': isCollapsed,
                      })}
                    >
                      {item.name}
                    </span>
                  </Fragment>
                }
                className="flex items-center px-6 py-1"
                showArrow={!isCollapsed}
                popover={isCollapsed}
              >
                <Fragment>
                  {item.child.map((subItem, index) => (
                    <li key={index} className="py-2" onClick={() => navigate(routerLinks(subItem.name))}>
                      {subItem.name}
                    </li>
                  ))}
                </Fragment>
              </Collapse>
            );
          }
        })}
      {menu[0].name === 'Danh sách tòa nhà' ? (
        <li
          className={classNames('flex items-center px-3 py-1 m-3', {
            'bg-white text-red-500 rounded-2xl': location.pathname === routerLinks('Receipt'),
            'text-white': location.pathname !== routerLinks('Receipt'),
          })}
          onClick={() => navigate(routerLinks('Receipt'))}
        >
          <i className={classNames('text-3xl mr-2.5', 'uhome-contract')} />
          <span
            className={classNames('transition-all duration-300 ease-in-out font-bold', {
              'opacity-100': !isCollapsed,
              'opacity-0 text-[0]': isCollapsed,
            })}
          >
            {t(`layout.${'Receipt'}`)}
          </span>
        </li>
      ) : (
        ''
      )}
      {/* <li
        className={classNames("flex items-center px-3 py-1 m-3", { 'bg-white text-red-500 rounded-2xl': location.pathname === '/quan-ly-nguoi-dung', 'text-white': location.pathname !== '/quan-ly-nguoi-dung' })}
        onClick={() =>  navigate('/quan-ly-nguoi-dung')}
      >
        <i className={classNames('text-3xl mr-2.5', "uhome-contract")} />
        <span className={classNames('transition-all duration-300 ease-in-out font-bold', { 'opacity-100': !isCollapsed, 'opacity-0 text-[0]': isCollapsed })}>
          {t('routes.admin.user-management.User Management') + ' - for Test'}
        </span>
      </li> */}

      {/* <li
        className={classNames("flex items-center px-3 py-1 m-3", { 'bg-white text-red-500 rounded-2xl': location.pathname === '/danh-sach-cong-viec', 'text-white': location.pathname !== '/danh-sach-cong-viec' })}
        onClick={() =>  navigate('/danh-sach-cong-viec')}
      >
        <i className={classNames('text-3xl mr-2.5', "uhome-contract")} />
        <span className={classNames('transition-all duration-300 ease-in-out font-bold', { 'opacity-100': !isCollapsed, 'opacity-0 text-[0]': isCollapsed })}>
          {t('routes.admin.job-management.Job Management') + ' - for Test'}
        </span>
      </li> */}
    </ul>
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default Layout;
