import React, { Component } from "react";
import { Form, Select } from "semantic-ui-react";

class AndroidUploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  projectFilesOnChange = (event, data) => {
    this.props.projectFilesOnChange(event.target.files);
  };

  deviceOnChange = (e, data) => {
    this.props.deviceOnChange(data.value);
  };

  androidVersionOnChange = (e, data) => {
    this.props.androidVersionOnChange(data.value);
  };

  apiVersionOnChange = (e, data) => {
    this.props.apiVersionOnChange(data.value);
  };

  render() {
    const detail = this.props.projectDetail;

    //extract android information
    const androidDetail = detail.projects.filter(project => {
      return project.projectType === "Android Application";
    });

    const deviceOption = androidDetail[0].device.map(v => {
      return { text: v, value: v };
    });

    const androidVersionOption = androidDetail[0].androidVersion.map(v => {
      return { text: v, value: v };
    });

    const apiVersionOption = androidDetail[0].apiVersion.map(v => {
      return { text: v, value: v };
    });

    return (
      <React.Fragment>
        <Form.Group widths="equal">
          <Form.Field
            fluid
            control={Select}
            options={deviceOption}
            label="Device"
            placeholder="Device"
            onChange={this.deviceOnChange}
          />
          <Form.Field
            fluid
            control={Select}
            options={androidVersionOption}
            label="Android Version"
            placeholder="Android Version"
            onChange={this.androidVersionOnChange}
          />
          <Form.Field
            fluid
            control={Select}
            options={apiVersionOption}
            label="API Version"
            placeholder="API Version"
            onChange={this.apiVersionOnChange}
          />
        </Form.Group>
        <Form.Field>
          <label> Application File</label>
          <input
            type="file"
            onChange={this.projectFilesOnChange}
            accept=".apk"
          />
        </Form.Field>
      </React.Fragment>
    );
  }
}

export default AndroidUploadForm;
