import React from 'react';

class UserInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originsNumber: 0,
      destinationsNumber: 0,
    };

    this.confirmUserAcceptance = this.confirmUserAcceptance.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
  }

  confirmUserAcceptance() {
    this.props.onUserConfirmation({
      originsNumber: this.state.originsNumber,
      destinationsNumber: this.state.destinationsNumber,
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
        <label htmlFor="originsNumber">Número de Origenes</label>
        <input
          type="number"
          className="form-control"
          id="originsNumber"
          placeholder="#"
          min={0}
          value={this.state.originsNumber}
          onChange={this.updateProperty('originsNumber')} />
      </div>
      <div className="form-group">
        <label htmlFor="destinationsNumber">Número de Destinos</label>
        <input
          type="number"
          className="form-control"
          id="destinationsNumber"
          placeholder="#"
          min={0}
          value={this.state.destinationsNumber}
          onChange={this.updateProperty('destinationsNumber')} />
      </div>

      <button
        type="submit"
        className="btn btn-default"
        onClick={this.confirmUserAcceptance}>
        Crear Matriz
      </button>
    </form>);
  }
}

UserInput.propTypes = {
  onUserConfirmation: React.PropTypes.func,
};

export default UserInput;