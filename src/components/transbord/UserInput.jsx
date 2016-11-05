import React from 'react';

class UserInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nodeNumber: 0,
    };

    this.confirmUserAcceptance = this.confirmUserAcceptance.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
  }

  confirmUserAcceptance() {
    this.props.onUserConfirmation({
      nodeNumber: this.state.nodeNumber,
    });
  }

  updateProperty(property) {
    return (event) => {
      return this.setState({
        [property]: +event.target.value,
      });
    };
  }

  render() {
    return (<form>
      <div className="form-group">
        <label htmlFor="nodeNumber">Número de Nodos</label>
        <input
          type="number"
          className="form-control"
          id="nodeNumber"
          placeholder="#"
          min={0}
          value={this.state.nodeNumber}
          onChange={this.updateProperty('nodeNumber')} />
      </div>

      <button
        type="submit"
        className="btn btn-default"
        onClick={this.confirmUserAcceptance}>
        Crear Modelo
      </button>
    </form>);
  }
}

UserInput.propTypes = {
  onUserConfirmation: React.PropTypes.func,
};

export default UserInput;
