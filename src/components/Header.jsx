import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      isLoading: true,
    };
  }

  componentDidMount = async () => {
    const user = await getUser();
    this.setState({ userName: user.name });
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading, userName } = this.state;
    if (isLoading === true) {
      return (<Loading />);
    }
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{ userName }</p>
      </header>
    );
  }
}
