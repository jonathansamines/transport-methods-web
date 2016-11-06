import React from 'react';
import io from 'transport-methods';
import UserInput from './UserInput';
import NodeNetwork from './NodeNetwork';
import ResultMatrix from './../minimum-cost/ResultMatrix';

class Transbord extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userHasConfirmed: false,
      userHasComputed: false,
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

  confirmGraph(graph) {
    const transportOptions = io.transbordModel({
      nodes: graph,
    });

    this.setState({
      transportOptions,
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
          <NodeNetwork nodes={this.state.nodeNumber} onUserConfirmation={this.confirmGraph} />
        }

        {
          this.state.userHasComputed &&
          <ResultMatrix transportMatrix={this.state.transportOptions} />
        }
      </div>
    );
  }
}

export default Transbord;
