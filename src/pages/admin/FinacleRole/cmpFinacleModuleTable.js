import React, { Component } from 'react';

export default class CmpFinacleModuleTable extends Component {

    onHandleClick(value) {
        this.props.handleSelection(value);
    };

    render() {

        const list = () => {
            if (this.props.data) {
                return this.props.data.map((entity, index) => {
                    return (
                        <tr className="selection" key={index}>
                            <td>{index + 1}</td>
                            <td>{entity.finacleRole}</td>
                            <td>{entity.rolePackageId}</td>
                        </tr>
                    )
                })
            }
        }

        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Finacle Role</th>
                            <th>Portal Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list()}
                    </tbody>

                </table>
            </div>
        )
    }
}
