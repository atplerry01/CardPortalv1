import moment from 'moment';
import React, { Component } from 'react';
import { roleService } from '../../../services/auth';

export default class CmpDebitUploadTable extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            
        };
    }
    
    render() {

        const list = () => {
            if (this.props.data) {
                return this.props.data.map((entity, index) => {
                    return (
                        <tr key={entity.id}>
                            <td>{index + 1}</td>
                            <td>{entity.userName}</td>
                            <td>{entity.status}</td>
                            <td>{entity.docFilePath}</td>
                            <td>{moment(entity.scheduledDate).format('Do MMM YY, h:mm:ss a')}</td>
                            <td>{moment(entity.dateUploaded).format('Do MMM YY, h:mm:ss a')}</td>
                            <td>
                                <a href={`/cards/debit-advice-upload/${entity.uploadID}`} >
                                    <i class="fa fa-edit"></i>
                                </a>
                            </td>
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
                            <th>UserName</th>
                            <th>Status</th>
                            <th>File Name</th>
                            <th>ScheduledDate</th>
                            <th>DateUploaded</th>
                            <th>
                                <a href={`/cards/debit-advice-upload/${this.props.data && this.props.data.id !== undefined && this.props.data.id ? this.props.data.id : 'new'}`}>
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {list()}
                    </tbody>

                </table>
            </div>
        )
    }

    removePackageRole = async (model) => {
        return await roleService.removePackageRole(model)
            .then(res => {
                console.log(res);
            })
    }

}
