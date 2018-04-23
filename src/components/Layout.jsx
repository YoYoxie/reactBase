import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Breadcrumb, Icon, Menu } from 'antd';
import { hashHistory } from 'react-router';
import Sidebar from './Sidebar';
import Submenu from './Submenu';
const SubMenu = Menu.SubMenu;

import styles from './Layout.less';

const Layout = ({ children, sidebar }) => {
    const { mode } = sidebar;
    return (
        <div className={styles.layoutaside}>
            <Sidebar />
            <div className={mode == "inline"?styles.layoutmain:styles.layoutview}>
                <div className={styles.layoutheader}>
                    <Submenu />
                </div>
                {children}
            </div>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.element.isRequired,
};
function mapStateToProps({ sidebar }) {
    return {
        sidebar: sidebar,
    };
}
export default connect(mapStateToProps)(Layout);
