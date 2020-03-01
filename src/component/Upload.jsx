import React, { Component } from "react";
import WebsiteUploadForm from "./WebsiteUploadForm";
import WindowUploadForm from "./WindowUploadForm";
import AndroidUploadForm from "./AndroidUploadForm";
import axios from "axios";
import {
  Header,
  Message,
  TextArea,
  Checkbox,
  Button,
  Form,
  Select,
  Input
} from "semantic-ui-react";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      projects: null,
      projectTypes: "",
      userName: "koko",
      selectProjectType: "",
      selectProjectName: "",
      selectLanguage: "",
      selectLanguageVersion: "",
      projectFiles: null,
      dbOnCheck: false,
      dbLanguage: "",
      dbVersion: "",
      dbName: "",
      dbBackUpFile: null,
      description: "",
      downloadPermission: false,
      androidDevice: "",
      apiVersion: "",
      androidVersion: "",
      errorStatus: false
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/supportLanguage")
      .then(response => {
        // handle success
        const pj = response.data;
        this.setState({
          loading: false,
          projects: pj,
          projectTypes: pj.projects.map(project => {
            return { text: project.projectType, value: project.projectType };
          }),
          selectProjectType: "Website"
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }

  postForm = () => {
    let formData = new FormData();
    var data;
    var key;
    switch (this.state.selectProjectType) {
      case "Website":
        data = {
          userName: this.state.userName,
          projectType: this.state.selectProjectType,
          projectName: this.state.selectProjectName,
          language: this.state.selectLanguage,
          languageVersion: this.state.selectLanguageVersion,
          projectFiles: this.state.projectFiles,
          isDbUsed: this.state.dbOnCheck,
          dbName: this.state.dbLanguage,
          dbVersion: this.state.dbVersion,
          dbBackupName: this.state.dbName,
          dbBackupFile: this.state.dbBackUpFile,
          description: this.state.description,
          downloadPermission: this.state.downloadPermission
        };

        Array.from(this.state.projectFiles).forEach(file => {
          formData.append("projectFiles", file, file.webkitRelativePath);
        });
        for (key in data) {
          if (key !== "projectFiles") formData.append(key, data[key]);
        }
        axios({
          method: "post",
          url: "http://localhost:8080/upload",
          data: formData
        })
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
        break;
      case "Window Application":
        data = {
          userName: this.state.userName,
          projectType: this.state.selectProjectType,
          projectName: this.state.selectProjectName,
          language: this.state.selectLanguage,
          languageVersion: this.state.selectLanguageVersion,
          projectFiles: this.state.projectFiles,
          isDbUsed: this.state.dbOnCheck,
          dbName: this.state.dbLanguage,
          dbVersion: this.state.dbVersion,
          dbBackupName: this.state.dbName,
          dbBackupFile: this.state.dbBackUpFile,
          description: this.state.description,
          downloadPermission: this.state.downloadPermission
        };

        Array.from(this.state.projectFiles).forEach(file => {
          formData.append("projectFiles", file, file.filename);
        });
        for (key in data) {
          if (key !== "projectFiles") formData.append(key, data[key]);
        }
        axios({
          method: "post",
          url: "http://localhost:8080/upload",
          data: formData
        })
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
        break;
      case "Android Application":
        data = {
          userName: this.state.userName,
          projectType: this.state.selectProjectType,
          projectName: this.state.selectProjectName,
          device: this.state.androidDevice,
          apiVersion: this.state.apiVersion,
          androidVersion: this.state.androidVersion,
          projectFiles: this.state.projectFiles,
          description: this.state.description,
          downloadPermission: this.state.downloadPermission
        };
        Array.from(this.state.projectFiles).forEach(file => {
          formData.append("projectFiles", file, file.filename);
        });
        for (key in data) {
          if (key !== "projectFiles") formData.append(key, data[key]);
        }

        axios({
          method: "post",
          url: "http://localhost:8080/upload",
          data: formData
        })
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
        break;
      default:
    }
  };

  deviceOnChange = value => {
    this.setState({ androidDevice: value });
  };

  androidVersionOnChange = value => {
    this.setState({ androidVersion: value });
  };

  apiVersionOnChange = value => {
    this.setState({ apiVersion: value });
  };

  projectTypeOnChange = (event, data) => {
    this.setState({ selectProjectType: data.value });
    this.reset();
    console.log(data.value);
  };

  projectNameOnChange = (event, data) => {
    this.setState({ selectProjectName: event.target.value });
    console.log(this.state.selectProjectName);
  };

  languageOnChange = value => {
    this.setState({ selectLanguage: value });
  };

  languageVersionOnChange = value => {
    this.setState({ selectLanguageVersion: value });
  };

  projectFilesOnChange = value => {
    this.setState({ projectFiles: value });
  };

  dbOnCheck = value => {
    this.setState({ dbOnCheck: value });
  };

  dbOnChanage = value => {
    this.setState({ dbLanguage: value });
  };

  dbVersionOnChange = value => {
    this.setState({ dbVersion: value });
  };

  dbNameOnChange = value => {
    this.setState({ dbName: value });
  };

  dbBackUpOnChange = value => {
    this.setState({ dbBackUpFile: value });
  };

  descriptionOnChange = (e, data) => {
    this.setState({ description: e.target.value });
  };

  downloadPermissionOnChange = (e, data) => {
    this.setState({ downloadPermission: data.checked });
  };

  onSubmit = e => {
    console.log("error status on submit :", this.state.errorStatus);
    e.preventDefault();
    this.validateForm();
    console.log("On Submit worked !");
    console.log("error status after submit:", this.state.errorStatus);
  };

  validateForm = () => {
    if (
      this.state.selectProjectType === "Website" ||
      this.state.selectProjectType === "Window Application"
    ) {
      if (this.state.selectProjectName === "")
        this.setState({ errorStatus: true });
      else if (this.state.selectLanguage === "")
        this.setState({ errorStatus: true });
      else if (this.state.selectLanguageVersion === "")
        this.setState({ errorStatus: true });
      else if (this.state.projectFiles === null)
        this.setState({ errorStatus: true });
      else if (this.state.dbOnCheck) {
        if (this.state.dbName === "") this.setState({ errorStatus: true });
        else if (this.state.dbLanguage === "")
          this.setState({ errorStatus: true });
        else if (this.state.dbVersion === "")
          this.setState({ errorStatus: true });
        else if (this.state.dbBackUpFile === null)
          this.setState({ errorStatus: true });
        else {
          this.setState({ errorStatus: false });
          console.log("posting form");
          this.postForm();
        }
      } else {
        this.setState({ errorStatus: false });
        console.log("posting form");
        this.postForm();
      }
    } else if (this.state.selectProjectType === "Android Application") {
      if (this.state.selectProjectName === "")
        this.setState({ errorStatus: true });
      else if (this.state.device === "") this.setState({ errorStatus: true });
      else if (this.state.projectFiles === null)
        this.setState({ errorStatus: true });
      else if (this.state.apiVersion === "")
        this.setState({ errorStatus: true });
      else if (this.state.androidVersion === "")
        this.setState({ errorStatus: true });
      else {
        this.setState({ errorStatus: false });
        console.log("posting form");
        this.postForm();
      }
    }
  };

  reset = () => {
    this.setState({
      selectLanguage: "",
      selectLanguageVersion: "",
      projectFiles: null,
      dbOnCheck: false,
      dbLanguage: "",
      dbVersion: "",
      dbBackUpFile: null,
      description: "",
      downloadPermission: false,
      androidDevice: "",
      apiVersion: "",
      androidVersion: ""
    });
  };

  render() {
    console.log("after render :", this.state.errorStatus);
    console.log("current state:", this.state);
    //error message
    let showErrorMessage = null;
    if (this.state.errorStatus) {
      showErrorMessage = (
        <Message error header="Failed to Submit ! Incomplete Form !" />
      );
    } else {
      showErrorMessage = null;
    }

    let uploadform;
    switch (this.state.selectProjectType) {
      case "Website":
        uploadform = (
          <WebsiteUploadForm
            projectDetail={this.state.projects}
            languageOnChange={this.languageOnChange}
            languageVersionOnChange={this.languageVersionOnChange}
            projectFilesOnChange={this.projectFilesOnChange}
            dbOnCheck={this.dbOnCheck}
            dbOnChange={this.dbOnChanage}
            dbNameOnChange={this.dbNameOnChange}
            dbVersionOnChange={this.dbVersionOnChange}
            dbBackUpOnChange={this.dbBackUpOnChange}
          />
        );
        break;
      case "Window Application":
        uploadform = (
          <WindowUploadForm
            projectDetail={this.state.projects}
            languageOnChange={this.languageOnChange}
            languageVersionOnChange={this.languageVersionOnChange}
            projectFilesOnChange={this.projectFilesOnChange}
            dbOnCheck={this.dbOnCheck}
            dbOnChange={this.dbOnChanage}
            dbNameOnChange={this.dbNameOnChange}
            dbVersionOnChange={this.dbVersionOnChange}
            dbBackUpOnChange={this.dbBackUpOnChange}
          />
        );
        break;
      case "Android Application":
        uploadform = (
          <AndroidUploadForm
            projectDetail={this.state.projects}
            deviceOnChange={this.deviceOnChange}
            apiVersionOnChange={this.apiVersionOnChange}
            androidVersionOnChange={this.androidVersionOnChange}
            projectFilesOnChange={this.projectFilesOnChange}
          />
        );
        break;
      default:
    }

    return (
      <div className="uploadForm">
        <Header as="h2" textAlign="center">
          Upload your project
        </Header>

        {showErrorMessage}
        <Form onSubmit={this.onSubmit}>
          <Form.Field
            fluid
            control={Select}
            label="Project Type"
            options={this.state.projectTypes}
            placeholder="Project Type"
            onChange={this.projectTypeOnChange}
          />
          <Form.Field
            inline
            fluid
            control={Input}
            label="Project Name"
            placeholder="Name"
            onChange={this.projectNameOnChange}
          />
          {uploadform}
          <Form.Field
            control={TextArea}
            label="Description"
            placeholder="Tell something about your project ..."
            onChange={this.descriptionOnChange}
            required
          />
          <Form.Field
            control={Checkbox}
            label="Allow download"
            onChange={this.downloadPermissionOnChange}
          />

          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default Upload;
