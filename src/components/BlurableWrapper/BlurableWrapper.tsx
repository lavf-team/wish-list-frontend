import React from 'react';

interface IProps {
  onBlur: (event) => void;
  children: React.ReactNode;
}

export default class BlurableWrapper extends React.Component<IProps> {
  refNode: any = React.createRef();

  constructor(props) {
    super(props);

    const { children } = this.props;
    if (children && (children as any).ref) {
      this.refNode = (children as any).ref;
    }
  }

  onClick = event => {
    if (!this.refNode || !this.refNode.current) {
      return;
    }
    if (this.refNode.current.contains(event.target)) {
      return;
    }
    this.props.onBlur(event);
  };

  componentDidMount() {
    document.addEventListener('click', this.onClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClick, false);
  }
  render() {
    const { children } = this.props;
    const type = typeof (children as any).type;

    if (type !== 'string') {
      return <div ref={this.refNode}>{children}</div>;
    }

    return React.cloneElement(children as any, {
      ref: this.refNode,
    });
  }
}
