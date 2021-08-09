import React, { Component } from "react";
import "./css/ProfileForm.css";

export class ProfileForm extends Component {
  render() {
    return (
      <div className="ProfileForm">
        <form>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nombre"
            onChange={this.props.onChange}
          />
          <br />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Correo electrónico"
            onChange={this.props.onChange}
          />
          <br />
          <label htmlFor="profilePhotoInput">
            Pon una imagen de perfil arrastrándola aquí o haz click y eligela entre tus archivos</label>
          <input
            type="file"
            name="profilePhoto"
            id="profilePhotoInput"
            onInput={this.props.onChange}
          />
          <br />
        </form>
      </div>
    );
  }
}

export default ProfileForm;
