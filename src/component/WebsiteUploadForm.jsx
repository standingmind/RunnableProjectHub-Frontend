import React, { Component } from "react";
import { Checkbox, Form, Select } from "semantic-ui-react";

class WebsiteUploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: null,
      databaseChecked: false
    };
  }

  languageOnChange = (event, data) => {
    this.props.languageOnChange(data.value);
    this.setState({ selectedLanguage: data.value });
  };

  languageVersionOnChange = (event, data) => {
    this.props.languageVersionOnChange(data.value);
  };

  projectFilesOnChange = (event, data) => {
    this.props.projectFilesOnChange(event.target.files);
  };

  dbOnCheck = (e, data) => {
    this.props.dbOnCheck(data.checked);
    this.setState({ databaseChecked: data.checked });
    console.log("database :", data.checked);
  };

  dbOnChange = (e, data) => {
    this.props.dbOnChange(data.value);
  };

  dbVersionOnChange = (e, data) => {
    this.props.dbVersionOnChange(data.value);
  };

  dbNameOnChange = e => {
    this.props.dbNameOnChange(e.target.value);
  };

  dbBackupOnChange = (e, data) => {
    this.props.dbBackUpOnChange(e.target.files);
  };

  render() {
    const detail = this.props.projectDetail;

    //extract website information
    const webDetail = detail.projects.filter(project => {
      return project.projectType === "Website";
    });
    //extract supported language version from webInfo
    const version = webDetail[0].language.filter(language => {
      return language.name === this.state.selectedLanguage;
    });
    let versionOption = null;
    if (version.length > 0) {
      versionOption = version[0].version.map(v => {
        return { text: v, value: v };
      });
    }

    //extract supported Language from webInfo (
    const languageOption = webDetail[0].language.map(language => {
      return { text: language.name, value: language.name };
    });

    //extract supported Database from webInfo (staic) need to dynamic for multi-db
    const databaseOption = detail.database.map(db => {
      return { text: db.name, value: db.name };
    });

    //extract supported Database version from webInfo (staic) need to dynamic for multi-db-version
    const dbVersionOption = detail.database[0].version.map(v => {
      return { text: v, value: v };
    });

    let dbComponent;
    if (this.state.databaseChecked) {
      console.log("checked work :", this.state.databaseChecked);
      dbComponent = (
        <React.Fragment>
          <Form.Field
            fluid
            control="input"
            label="Database Name"
            placeholder="Database Name"
            onChange={this.dbNameOnChange}
            required
          />
          <Form.Group widths="equal">
            <Form.Field
              fluid
              control={Select}
              placeholder="Database"
              options={databaseOption}
              label="database"
              width={6}
              onChange={this.dbOnChange}
            />
            <Form.Field
              fluid
              control={Select}
              placeholder="Version"
              options={dbVersionOption}
              label="version"
              width={6}
              onChange={this.dbVersionOnChange}
            />
            <Form.Field
              className="browsefile"
              fluid
              control="input"
              label="database backup "
              type="file"
              accept=".sql"
              onChange={this.dbBackupOnChange}
            />
          </Form.Group>
        </React.Fragment>
      );
    } else {
      dbComponent = null;
    }

    return (
      <React.Fragment>
        <Form.Group widths="equal">
          <Form.Field
            fluid
            control={Select}
            options={languageOption}
            label="Language"
            placeholder="Language"
            onChange={this.languageOnChange}
            width={6}
          />
          <Form.Field
            fluid
            control={Select}
            options={versionOption}
            label="Version"
            placeholder="Version"
            onChange={this.languageVersionOnChange}
            width={6}
          />
          <Form.Field className="browsefile">
            <label> Project Files</label>
            <input
              directory=""
              webkitdirectory=""
              type="file"
              onChange={this.projectFilesOnChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field
          control={Checkbox}
          label="check to upload database"
          onChange={this.dbOnCheck}
          defaultChecked={this.state.databaseChecked}
        />

        {dbComponent}
      </React.Fragment>
    );
  }
}

export default WebsiteUploadForm;
