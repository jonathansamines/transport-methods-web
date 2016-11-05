import React from 'react';
import UserInput from './UserInput';
import NodeNetwork from './NodeNetwork';

class Transbord extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userHasConfirmed: false,
    };

    this.confirmNodes = this.confirmNodes.bind(this);
  }
  confirmNodes(result) {
    this.setState({
      userHasConfirmed: true,
      nodeNumber: result.nodeNumber,
    });
  }
  render() {
    return (
      <div>
        {!this.state.userHasConfirmed && <UserInput onUserConfirmation={this.confirmNodes} />}
        {this.state.userHasConfirmed && <NodeNetwork nodes={this.state.nodeNumber} />}
      </div>
    );
  }
}

export default Transbord;
