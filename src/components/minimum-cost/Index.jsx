import React from 'react';
import UserInput from './UserInput';
import CostMatrix from './CostMatrix';
import ResultMatrix from './ResultMatrix';

class MinimumCost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMatrixCreated: false,
      isResultComputed: false,
      transportMatrix: null,
    };

    this.allowMatrixCreation = this.allowMatrixCreation.bind(this);
    this.allowResultCreation = this.allowResultCreation.bind(this);
  }

  allowMatrixCreation({ originationsNumber, destinationsNumber }) {
    this.setState({
      originationsNumber,
      destinationsNumber,
      isMatrixCreated: true,
    });
  }

  allowResultCreation(transportMatrix) {
    this.setState({
      transportMatrix,
    });
  }

  createMatrixOnUserConfirmation() {
    if (this.state.isMatrixCreated) {
      return (
        <CostMatrix
          originationsNumber={this.state.originationsNumber}
          destinationsNumber={this.state.destinationsNumber}
          onUserConfirmation={this.allowResultCreation} />
      );
    }

    return null;
  }

  createResultMatrixOnUserConfirmation() {
    if (this.state.transportMatrix) {
      return (
        <div>
          <hr />
          <ResultMatrix
            resolveBy="minimumCost"
            transportMatrix={this.state.transportMatrix} />
        </div>
      );
    }

    return null;
  }

  createUserInput() {
    if (!this.state.isMatrixCreated) {
      return <UserInput onUserConfirmation={this.allowMatrixCreation} />;
    }

    return null;
  }

  render() {
    return (
      <div>
        {this.createUserInput()}
        {this.createMatrixOnUserConfirmation()}
        {this.createResultMatrixOnUserConfirmation()}
      </div>
    );
  }
}

export default MinimumCost;
