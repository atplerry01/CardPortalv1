import React, { Component } from 'react';
import ContentHeader from "../../../components/ContentHeader";
import { authService } from "../../../services/auth";
import { columns, data } from "./data";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";

export default class ProfiledUsers extends Component {
    state = {
        userProfiles: [],
    };

    async componentDidMount() {
        this.getProfileUsers();
    }

    render() {
        const { userProfiles } = this.state;
        const tableData = {
            columns,
            data: userProfiles && userProfiles !== null ? userProfiles : []
        };

        return (
            <div className="main">
                <ContentHeader title="Profiled Users" />
                
                {userProfiles && userProfiles.length > 0 &&
                    <DataTableExtensions {...tableData}>
                        <DataTable
                            columns={columns}
                            data={data}
                            noHeader
                            defaultSortField="id"
                            defaultSortAsc={false}
                            pagination
                            highlightOnHover
                            pointerOnHover={true}
                            selectableRows={true}
                            onRowClicked={(entity) => {
                                this.setState({ selectedItem: '', selectedItem: entity })
                            }}
                            onSelectedRowsChange={(entity) => {
                                this.setState({ selectedItem: '', selectedItem: entity })
                            }}
                        />
                    </DataTableExtensions>
                }

            </div>
        )
    }

    getProfileUsers = async () => {
        await authService.getProfiledUsers()
            .then(resp => {

                if (resp.success) {
                    this.setState({ userProfiles: resp.data });
                }
            });
    }

}
