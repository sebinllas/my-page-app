import React, { Component } from "react";
import LinkCard from "./components/LinkCard";
import NewLinkForm from "./components/NewLinkForm";
import Links from "./components/Links";
import linkImage from "./assets/images/link.svg";
import Alert from './components/Alert'
import addIcon from "./assets/images/add_circle_black_24dp.svg";
import "./App.css";
import ProfileForm from "./components/ProfileForm";
import Profile from "./components/Profile";
import defaultProfile from "./assets/images/account_circle_black_24dp.svg";
import { v4 as uuidv4 } from 'uuid';


export default class App extends Component {
  state = {
    form: { url: "", title: "", description: "" },
    logoUrl: linkImage,
    formFocused: true,
    links: [],
    profile: { profilePhoto: defaultProfile },
  };
  handleImageClick = (e) => {
    this.setState({ ...this.state, logoUrl: e.target.src });
  };
  addLink = (e) => {
    e.preventDefault();
    if ((this.state.form.title || this.state.form.description) && this.state.form.url) {
      let nextState = this.state;
      const re = /^(https?):\/\/[^\s]*$/;
      if (!re.test(nextState.form.url)) {
        nextState.form.url = "http://" + nextState.form.url;
      }
      nextState.links.push({
        key: uuidv4(),
        title: this.state.form.title,
        url: this.state.form.url,
        logoUrl: this.state.logoUrl,
        description: this.state.form.description,
      });
      nextState.form = { url: "", title: "", description: "" };
      nextState.showAlert = false;
      nextState.logoUrl = linkImage;
      this.setState(nextState);
    }
    else {
      this.setState({ ...this.state, showAlert: true })
    }
  }


  handleChangeNewLink = (e) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  // uploadImage = img => {
  //   imgur
  //     .uploadBase64(img)
  //     .then((json) => {
  //       console.log(json.link);
  //     })
  //     .catch((err) => {
  //       console.error(err.message);
  //     });
  // }

  handleChangeProfile = (e) => {
    if (e.target.files) {
      // this.uploadImage( e.target.files[0]);

      this.setState({
        ...this.state,
        profile: {
          ...this.state.profile,
          [e.target.name]: e.target.files[0],
        },
      });
      console.log("state: ", this.state.profile);
      return;
    }
    this.setState({
      ...this.state,
      profile: {
        ...this.state.profile,
        [e.target.name]: e.target.value,
      },
    });
    console.log("state: ", this.state.profile);
  };

  deleteLink = key => {
    const nextState = { ...this.state };
    const i = nextState.links.findIndex(link => link.key === key);
    nextState.links.splice(i, 1)
    this.setState(nextState)
  }
  closeAlert = () => {
    this.setState({ ...this.state, showAlert: false })
  }
  render() {
    return (
      <div className="App">
        <div className="forms">
          <ProfileForm
            onChange={this.handleChangeProfile}
            className="ProfileForm"
          />

          <NewLinkForm
            onChange={this.handleChangeNewLink}
            onSubmit={this.handleSubmit}
            values={this.state.form}
            onImageClick={this.handleImageClick}
          />
          <div className="linkPreview">
            <LinkCard
              title={this.state.form.title}
              url={this.state.form.url}
              description={this.state.form.description}
              logoUrl={this.state.logoUrl}
              className="LinkCardPreview"
            />

            <button type='submit' className="addLinkBtn" onClick={this.addLink}>
              <img src={addIcon} alt="" />
            </button>

          </div>
          <Alert show={this.state.showAlert} closeAlert={this.closeAlert}>
            <div>
              <h3>Información incompleta</h3>
              <p>Rellena los campos necesarios</p>
            </div>
          </Alert>
        </div>

        <div className="PhoneView">
          <Profile
            profilePhoto={
              typeof this.state.profile.profilePhoto === "string" | !this.state.profile.profilePhoto
                // ? this.state.profile.profilePhoto
                ? defaultProfile
                : URL.createObjectURL(this.state.profile.profilePhoto)
            }
            name={this.state.profile.name}
          />
          <Links links={this.state.links} deleteLink={this.deleteLink} />
        </div>
      </div>
    );
  }
}
