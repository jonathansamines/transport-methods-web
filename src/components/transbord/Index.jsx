import React from 'react';
import io from 'transport-methods';
import UserInput from './UserInput';
import NodeNetwork from './NodeNetwork';
import ResultMatrix from './../minimum-cost/ResultMatrix';
import transportMethods from './../enums/transport-methods';

class Transbord extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userHasConfirmed: false,
      userHasComputed: false,
      resolutionMode: transportMethods.minimumCost,
    };

    this.confirmNodes = this.confirmNodes.bind(this);
    this.confirmGraph = this.confirmGraph.bind(this);
  }

  confirmNodes(result) {
    this.setState({
      userHasConfirmed: true,
      nodeNumber: result.nodeNumber,
    });
  }

  confirmGraph({ nodes, resolutionMode }) {
    const transportOptions = io.transbordModel({
      nodes,
    });

    this.setState({
      transportOptions,
      resolutionMode,
      userHasComputed: true,
    });
  }

  render() {
    return (
      <div>
        {!this.state.userHasConfirmed &&
          <UserInput onUserConfirmation={this.confirmNodes} />
        }

        {
          this.state.userHasConfirmed &&
          <NodeNetwork
            nodes={this.state.nodeNumber}
            onUserConfirmation={this.confirmGraph} />
        }

        {
          this.state.userHasComputed &&
          <ResultMatrix
            resolveBy={this.state.resolutionMode}
            transportMatrix={this.state.transportOptions} />
        }
      </div>
    );
  }
}

export default Transbord;
