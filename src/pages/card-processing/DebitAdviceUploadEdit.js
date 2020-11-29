import moment from 'moment';
import React, { Component } from 'react';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import DateTimePicker from 'react-datetime-picker';
import Dropzone from 'react-dropzone';
import Swal from "sweetalert2";
import { debitCardService } from '../../services/cards';
import { directDebitColumns } from "../../utils/data";

export default class DirectDebitExemptionEdit extends Component {
    constructor(props, context) {
        super(props, context);

        var dt = new Date();

        this.state = {
            uploadedFile: {},
            uploadDetails: {},
            viewStatus: false,
            hasFile: false,
            date: moment(dt).add(60, 'm').toDate(),
            reRunDate: moment(dt).add(60, 'm').toDate(),
            title: '',
            buttonText: 'Upload File'
        };
    }

    async componentDidMount() {

        if (this.props.match.params && this.props.match.params.id && this.props.match.params.id === 'new') {
            this.setState({ title: 'Create Debit Advice Upload', viewStatus: false, itemId: this.props.match.params.id });
        }

        if (this.props.match.params && this.props.match.params.id && this.props.match.params.id !== 'new') {
            this.setState({ title: 'Edit Debit Advice Upload', viewStatus: true, hasFile: true, buttonText: 'Reschedule Date', itemId: this.props.match.params.id });
            await this.getDirectDebitUploadDetails(this.props.match.params.id);
        }

    }

    onChange = date => {
        this.setState({ date })
    }

    onChangeReRun = reRunDate => {
        this.setState({ reRunDate })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onHandleClick = (e, file) => {
        e.preventDefault();

        if (this.state.viewStatus) {
            const model = {
                uploadID: this.props.match.params.id,
                scheduledDate: this.state.date.toJSON(),
                rerunDate: this.state.reRunDate.toJSON(),
            };

            this.resheduleDirectDebitUpload(model);

        } else {
            const formData = new FormData();
            formData.append('FormFile', file);
            formData.append('ScheduledDate', this.state.date.toJSON());
            formData.append('rerunDate', this.state.reRunDate.toJSON());

            this.postDirectDebitUpload(formData);
        }

    };

    onCancelUpload = () => {
        const model = {
            uploadID: this.props.match.params.id,
            scheduledDate: this.state.date.toJSON()
        };

        this.cancelDirectDebitUpload(model);
    }

    onFileDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            this.setState({ hasFile: true, uploadedFile: acceptedFiles[0] })
        }
    }

    render() {
        const { uploadedFile, hasFile } = this.state;

        const tableData = {
            columns: directDebitColumns,
            data: this.state.directDebitRecords
        };

        return (
            <>
                <div className="page-section">
                    <div className="section-block">
                        <div className="row">
                            <div className="col-xl-3" style={{ marginRight: 50 }}>
                                <form>
                                    <h5>{this.state.title}</h5>

                                    {!this.state.viewStatus &&
                                        <>
                                            <div className="FileUpload">
                                                <strong>Select Upload File</strong>
                                                <Dropzone multiple={false}
                                                    onDrop={acceptedFiles => this.onFileDrop(acceptedFiles)}
                                                    style={{ "width": "100%", "height": "20%", "border": "1px solid black" }}
                                                >
                                                    {({ getRootProps, getInputProps }) => (
                                                        <section>
                                                            <div {...getRootProps()}
                                                                style={{ "width": "100%", "height": "20%", "border": "1px dashed black", padding: 20 }}>
                                                                <input {...getInputProps()} />
                                                                <p>Drag 'n' drop some files here, or click to select files</p>

                                                                <div
                                                                    className="btn btn-primary btn-block"
                                                                    type="submit"
                                                                >
                                                                    {'Add File'}
                                                                </div>
                                                            </div>

                                                        </section>
                                                    )}
                                                </Dropzone>

                                            </div>

                                            <div>
                                                <p>{hasFile && <div>Selected File Ok</div>}</p>
                                                <p>{!hasFile && <div>No File Selected</div>}</p>

                                                {hasFile && uploadedFile && <span><strong>File Name:</strong> {uploadedFile.name} <br /></span>}
                                                {hasFile && uploadedFile && <span><strong>File Size:</strong> {uploadedFile.size}KB <br /></span>}
                                                {hasFile && uploadedFile && <span><strong>File Type:</strong> {uploadedFile.type} <br /><br /></span>}

                                            </div>

                                        </>
                                    }

                                    <div>
                                        {this.state.viewStatus &&
                                            <>
                                                <strong>Selected File</strong>
                                                <p>Upload ID: {this.props.match.params.id}</p>
                                            </>
                                        }
                                    </div>

                                    <div>
                                        <strong>Scheduled Date</strong>
                                        <DateTimePicker
                                            onChange={this.onChange}
                                            value={this.state.date}
                                        />
                                    </div>

                                    <div>
                                        <br />
                                        <strong>ReRun Date</strong>
                                        <DateTimePicker
                                            onChange={this.onChangeReRun}
                                            value={this.state.reRunDate}
                                        />
                                    </div>

                                    <br />

                                    <button
                                        className="btn btn-primary btn-block"
                                        type="submit"
                                        disabled={!this.state.hasFile}
                                        onClick={(e) => this.onHandleClick(e, this.state.uploadedFile)}
                                    >
                                        {this.state.buttonText}
                                    </button>

                                </form>

                            </div>

                            {this.state.viewStatus &&
                                <div className="col-xl-8">
                                    <h5>Upload Details</h5>

                                    <div className="form-row">
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="lastName">UploadID</label>
                                            <input type="text" id="uploadID"
                                                value={this.state.uploadDetails.uploadID || ''}
                                                className="form-control" disabled />
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="fileName">File Name</label>
                                            <input type="text" id="fileName"
                                                value={this.state.uploadDetails.fileName || ''}
                                                className="form-control" disabled />
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="lastName">Scheduled Date</label>
                                            <input type="text" id="scheduledDate"
                                                value={moment(this.state.uploadDetails.scheduledDate).format('Do MMM YY, h:mm:ss a') || ''}
                                                className="form-control" disabled />
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="lastName">Date Uploaded</label>
                                            <input type="text" id="dateUploaded"
                                                value={moment(this.state.uploadDetails.dateUploaded).format('Do MMM YY, h:mm:ss a') || ''}
                                                className="form-control" disabled />
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="lastName">Status</label>
                                            <input type="text" id="status"
                                                value={this.state.uploadDetails.status || ''}
                                                className="form-control" disabled />
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="lastName">ReRun Date</label>
                                            <input type="text" id="status"
                                                value={moment(this.state.uploadDetails.rerunDate).format('Do MMM YY, h:mm:ss a') || ''}
                                                className="form-control" disabled />
                                        </div>
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <button
                                            className="btn btn-primary btn-block"
                                            type="submit"
                                            disabled={!this.state.hasFile}
                                            onClick={() => this.onCancelUpload()}
                                        >
                                            Cancel Schedule
                                            </button>

                                    </div>

                                </div>
                            }

                        </div>

                        <div className="row">

                            <div className="col-xl-12">
                                {this.state.directDebitRecords &&
                                    <>
                                        <br /><br />
                                        <h5>Direct Debit Records</h5>

                                        <DataTableExtensions {...tableData}>
                                            <DataTable
                                                columns={directDebitColumns}
                                                data={this.state.directDebitRecords}
                                                noHeader
                                                defaultSortField="id"
                                                defaultSortAsc={false}
                                                pagination
                                                highlightOnHover
                                                selectableRows={true}
                                                onRowClicked={(entity) => console.log(entity)}
                                                onSelectedRowsChange={(entity) => console.log(entity)}
                                            />
                                        </DataTableExtensions>
                                    </>
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }

    getDirectDebitUploadDetails = async (id) => {
        return await debitCardService.getDirectDebitUploadDetails(id)
            .then(res => {
                if (res.success) {
                    this.setState({
                        date: moment(res.data.scheduledDate).toDate(),
                        reRunDate: moment(res.data.rerunDate).toDate(),
                        uploadDetails: res.data,
                        directDebitRecords: res.data && res.data.directDebitRecords ? res.data.directDebitRecords : []
                    });
                }
            })
    }

    postDirectDebitUpload = async (model) => {

        return await debitCardService.postDirectDebitUpload(model)
            .then(res => {
                if (res.success) {
                    Swal.fire({
                        confirmButtonColor: "#800080",
                        text: res.data,
                        icon: "success"
                    }).then(result => {
                        if (result.value) {
                            window.location = "cards/debit-advice-upload";
                        }
                    });
                } else {
                    Swal.fire({
                        confirmButtonColor: "#800080",
                        text: "Request Failed",
                        icon: "error"
                    }).then(result => {
                        if (result.value) {
                            // window.location = "cards/issuance/debit-cards";
                        }
                    });
                }
            })
    }

    resheduleDirectDebitUpload = async (model) => {
        return await debitCardService.resheduleDirectDebitUpload(model)
            .then(res => {

                if (res.success) {
                    this.getDirectDebitUploadDetails(this.state.itemId);
                    Swal.fire({
                        confirmButtonColor: "#800080",
                        text: res.data,
                        icon: "success"
                    }).then(result => {
                        if (result.value) {
                            // window.location = "cards/direct-debit-exemptions";
                        }
                    });
                } else {
                    Swal.fire({
                        confirmButtonColor: "#800080",
                        text: res.data.message,
                        icon: "error"
                    }).then(result => {
                        if (result.value) {
                            // window.location = "cards/issuance/debit-cards";
                        }
                    });
                }


            })
    }

    cancelDirectDebitUpload = async (model) => {
        return await debitCardService.cancelDirectDebitUpload(model)
            .then(res => {

                if (res.success) {
                    Swal.fire({
                        confirmButtonColor: "#800080",
                        text: res.data,
                        icon: "success"
                    }).then(result => {
                        if (result.value) {
                            this.getDirectDebitUploadDetails(this.state.itemId);
                        }
                    });
                } else {
                    Swal.fire({
                        confirmButtonColor: "#800080",
                        text: "Request Failed",
                        icon: "error"
                    }).then(result => {
                        if (result.value) {
                            // window.location = "cards/issuance/debit-cards";
                        }
                    });
                }


            })
    }

}
