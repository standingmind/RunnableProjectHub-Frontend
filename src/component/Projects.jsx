import React, { Component } from "react";
import {
  Input,
  Select,
  Item,
  Button,
  Message,
  Label,
  Form,
  Segment
} from "semantic-ui-react";
import axios from "axios";
import filedownload from "js-file-download";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pattern: "",
      projectType: "",
      language: "",
      languageOptions: [
        { text: "All", value: "All" },
        { text: "PHP", value: "PHP" },
        { text: "HTML", value: "HTML" },
        { text: "JAVA", value: "JAVA" }
      ],
      projects: []
    };
  }

  componentDidMount() {
    this.fetchProject();
  }

  demoOnClick = (containerName, projectType, containerIP, isDbUsed) => {
    console.log("container IP :", containerIP);
    window.open("http://" + containerIP, "_blank");
    if (projectType === "Window Application") {
      setTimeout(() => {
        let formData = new FormData();
        formData.append("containerName", containerName);
        formData.append("projectType", projectType);
        axios({
          method: "post",
          url: "http://localhost:8080/startApplication",
          data: formData
        })
          .then(response => {})
          .catch(function(error) {
            console.log(error);
          });
      }, 10000);
    } else if (projectType === "Android Application") {
      setTimeout(() => {
        let formData = new FormData();
        formData.append("containerName", containerName);
        formData.append("projectType", projectType);
        axios({
          method: "post",
          url: "http://localhost:8080/startApplication",
          data: formData
        })
          .then(response => {})
          .catch(function(error) {
            console.log(error);
          });
      }, 10000);
    } else if (projectType === "Website") {
      if (isDbUsed) {
        console.log("calling web start application");

        let formData = new FormData();
        formData.append("containerName", containerName + "sql");
        formData.append("projectType", projectType);
        axios({
          method: "post",
          url: "http://localhost:8080/startApplication",
          data: formData
        })
          .then(response => {})
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  };

  downloadOnClick = (username, projectName, zipPath) => {
    console.log("data :", username, projectName, zipPath);
    let formData = new FormData();
    formData.append("userName", username);
    formData.append("projectName", projectName);
    formData.append("zipName", zipPath);
    axios({
      method: "post",
      url: "http://localhost:8080/download",
      data: formData
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.zip"); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  fetchProject = () => {
    let data = {};
    if (this.state.pattern !== "") data["pattern"] = this.state.pattern;
    if (this.state.language !== "") data["language"] = this.state.language;
    if (this.state.projectType !== "")
      data["projectType"] = this.state.projectType;

    axios({
      method: "get",
      url: "http://localhost:8080/project",
      params: data
    })
      .then(response => {
        this.setState({ projects: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  projectTypeOnChange = (event, data) => {
    switch (data.value) {
      case "Website":
        this.setState({
          languageOptions: [
            { text: "All", value: "All" },
            { text: "PHP", value: "PHP" },
            { text: "HTML", value: "HTML" }
          ],
          projectType: data.value
        });
        break;
      case "Window Application":
        this.setState({
          languageOptions: [
            { text: "All", value: "All" },
            { text: "JAVA", value: "JAVA" }
          ],
          projectType: data.value
        });
        break;
      case "Android Application":
        this.setState({
          languageOptions: [{ text: "All", value: "All" }],
          projectType: data.value
        });
        break;
      default:
        this.setState({
          languageOptions: [
            { text: "All", value: "All" },
            { text: "PHP", value: "PHP" },
            { text: "HTML", value: "HTML" },
            { text: "JAVA", valu: "JAVA" }
          ],
          projectType: ""
        });
    }
  };

  languageOnChange = (e, data) => {
    if (data.value === "All") this.setState({ language: "" });
    else this.setState({ language: data.value });
  };

  searchOnChange = e => {
    this.setState({ pattern: e.target.value });
    console.log(e.target.value);
  };

  searchOnClick = e => {
    this.fetchProject();
  };

  filterDate = date => {
    var today = new Date();
    var diff = Math.round(
      (Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        today.getHours(),
        today.getMinutes()
      ) -
        Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes()
        )) /
        (1000 * 60)
    );
    console.log("diff :", diff);
    if (diff === 1) {
      return "1 min ago";
    } else if (diff >= 1 && diff < 60) {
      return diff + " mins ago";
    } else if (diff >= 60 && diff <= 60 * 2) {
      return "1 hour ago";
    } else if (diff >= 60 * 2 && diff < 60 * 24) {
      return Math.round(diff / 60) + " hours ago";
    } else if (diff >= 60 * 24 && diff < 60 * 24 * 2) {
      return "1 day ago";
    } else if (diff >= 60 * 24 * 2 && diff < 60 * 24 * 7) {
      return Math.round((diff / 60) * 24) + " days ago";
    } else if (diff >= 60 * 24 * 7 && diff < 60 * 24 * 14) {
      return "1 week ago";
    } else if (diff >= 60 * 24 * 14 && diff < 60 * 24 * 21) {
      return "2 weeks ago";
    } else if (diff >= 60 * 24 * 21 && diff < 60 * 24 * 28) {
      return "3 weeks ago";
    } else if (diff >= 60 * 24 * 30 && diff < 60 * 24 * 30 * 2) {
      return "1 month ago";
    } else if (diff >= 60 * 24 * 30 * 2 && diff < 60 * 24 * 30 * 12) {
      return Math.round(diff / (60 * 24 * 30)) + " months ago";
    }
  };
  render() {
    console.log("projects:", this.state.projects);
    let items;
    if (this.state.projects !== null) {
      items = this.state.projects.map(project => {
        const date = this.filterDate(new Date(project.createdDate));

        return (
          <Item key={project.ProjectName}>
            <Item.Content>
              <Item.Header as="a">{project.ProjectName}</Item.Header>

              <Item.Meta>
                <Label>{date}</Label>
                <span> by {project.username}</span>
              </Item.Meta>
              <Item.Description>{project.description}</Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  icon="play"
                  color="twitter"
                  onClick={e => {
                    this.demoOnClick(
                      project.ContainerName,
                      project.ProjectType,
                      project.ContainerIP,
                      project.dbUsed
                    );
                  }}
                ></Button>

                <Button
                  floated="right"
                  icon="download"
                  color="twitter"
                  onClick={e => {
                    this.downloadOnClick(
                      project.username,
                      project.ProjectName,
                      project.zipPath
                    );
                  }}
                />

                <Label>{project.ProjectType}</Label>

                <Label>{project.Language}</Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        );
      });
    } else {
      items = (
        <Message
          negative
          icon="search"
          header="Result Not Found."
          content="Please try another keywords."
        />
      );
    }

    const projectTypeOptions = [
      { text: "All", value: "All" },
      { text: "Website", value: "Website" },
      { text: "Window Application", value: "Window Application" },
      { text: "Android", value: "Android" }
    ];

    return (
      <React.Fragment>
        <div className="projectContent">
          <Form.Group>
            <Segment clearing>
              <Input placeholder="Search..." onChange={this.searchOnChange} />
              <Button content="Search" onClick={this.searchOnClick} />

              <span className="padd"></span>
              <Select
                placeholder="Project Type"
                options={projectTypeOptions}
                onChange={this.projectTypeOnChange}
              />
              <span className="padd"></span>
              <Select
                placeholder="Language"
                options={this.state.languageOptions}
                onChange={this.languageOnChange}
              />
            </Segment>
          </Form.Group>
          <Segment>
            <Item.Group divided>{items}</Item.Group>
          </Segment>
        </div>
      </React.Fragment>
    );
  }
}

export default Projects;
