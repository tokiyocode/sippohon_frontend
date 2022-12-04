import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarButton from './SidebarButton';
import SidebarCollapsibleItem from './SidebarCollapsibleItem';
import SidebarItem from './SidebarItem';
import {getCurrentUser} from "../services/authService";
import Modal from './Modal';

class Sidebar extends Component {
    state = {
        showLogoutModal: false
    };

    handleLogout = () => {
        this.props.navigate("/logout", {replace: true});
    }

    handleOpenModal = () => {
        this.setState({ showLogoutModal: true});
    }

    handleCloseModal = () => {
        this.setState({ showLogoutModal: false });
    }

    getCollapsibleItems = () => {
        const user = getCurrentUser();

        const collapsibleItems = [
            {
                label: "Admin",
                iconClass: "mdi mdi-account",
                href: "/admin",
                hide: true
            },
            {
                label: 'Pohon',
                iconClass: 'mdi mdi-tree',
                href: '/pohon',
            },
            {
                label: 'Bank Sampah',
                iconClass: 'mdi mdi-bank',
                href: '/bankSampah'
            },
            {
                label: 'TPS',
                iconClass: 'mdi mdi-delete',
                href: '/tempatPembuanganSampah'
            },
            {
                label: 'TPA',
                iconClass: 'mdi mdi-delete-forever',
                href: '/tempatPembuanganAkhir'
            },
            {
                label: 'Ruang Hijau',
                iconClass: 'mdi mdi-ungroup',
                href: '/ruangTerbukaHijau'
            }
        ];

        if (user.role.label === "Super Admin") {
            const collapsibleItem = collapsibleItems.find(collapsibleItem => collapsibleItem.label === "Admin");
            delete collapsibleItem.hide;
        }

        return collapsibleItems;
    }

    render() {
        const {showLogoutModal} = this.state;

        return (
            <>
                {showLogoutModal && 
                <Modal 
                    body={"Yakin ingin logout?"}
                    btnCancelLabel={"Batal"}
                    btnSubmitLabel={"Logout"}
                    onClose={() => this.handleCloseModal()}
                    onSubmit={() => this.handleLogout()} 
                />}
                <aside className="left-sidebar" data-sidebarbg="skin6">
                    <div className="scroll-sidebar">
                        <nav className="sidebar-nav">
                            <ul id="sidebarnav">
                                <SidebarItem label={"Dashboard"} iconClass={"mdi mdi-view-dashboard"} href="/dashboard" />
                                <SidebarCollapsibleItem label={"Tabel"} iconClass={"mdi mdi-table"} items={this.getCollapsibleItems()} />
                                <SidebarItem label={"Peta"} iconClass={"mdi mdi-map"} href="/peta"/>
                                <SidebarButton onClick={() => this.handleOpenModal()} label={"Logout"} />
                            </ul>
                        </nav>
                    </div>
                </aside>
        </>
        );
    }
}

function WithHooks(Component) {
    return function WrappedComponent(props) {
        return <Component 
                    {...props}
                    navigate={useNavigate()} />;
    }
}

export default WithHooks(Sidebar);