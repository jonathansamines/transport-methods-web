import React from 'react';
import cloneDeep from 'lodash.clonedeep';
import Node from './Node';
import range from './../utils/array-range';

function computeNodeReferences(node) {
  const value = node.currentReference;

  return value
    .split(',')
    .map((ref) => {
      if (ref.length === 0) return null;

      const [nodeRef, cost] = ref.split('=').map((p) => p.trim());

      return {
        reference: `Nodo Numero #${nodeRef}`,
        cost: +cost,
      };
    })
    .filter((ref) => ref !== null);
}

class NodeNetwork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: range(this.props.nodes)
        .map((n) => {
          return {
            name: `Nodo Numero #${n}`,
            type: 'intermediary',
            currentReference: '',
            input: 0,
            output: 0,
            next: [],
          };
        }),
    };

    this.updateNode = this.updateNode.bind(this);
    this.confirmUserAcceptance = this.confirmUserAcceptance.bind(this);
  }

  confirmUserAcceptance() {
    const nodes = cloneDeep(this.state.nodes);

    nodes.forEach((node) => {
      node.next = computeNodeReferences(node);
      delete node.currentReference;
    });

    this.setState({
      nodes: this.state.nodes.slice(),
    });

    this.props.onUserConfirmation(nodes);
  }

  updateNode(node) {
    this.setState({
      nodes: this.state.nodes.slice(),
    });
  }

  renderNodes() {
    return this.state
      .nodes
      .map((node) => {
        return (
          <Node
            key={node.name}
            node={node}
            onNodeUpdated={this.updateNode} />
        );
      });
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="row">
          {this.renderNodes()}
        </div>

        <div className="row">
          <hr />
          <hr />

          <button
            type="submit"
            className="btn btn-default"
            onClick={this.confirmUserAcceptance}>
            Resolver
          </button>

          <hr />
          <hr />
        </div>
      </form>
    );
  }
}

NodeNetwork.propTypes = {
  nodes: React.PropTypes.number,
  onUserConfirmation: React.PropTypes.func,
};

export default NodeNetwork;
