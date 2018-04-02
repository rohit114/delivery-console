import { Menu } from 'antd';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { NormandyLink as Link } from 'normandy/Router';
import { withRouter } from 'react-router';

import QuerySessionInfo from 'normandy/components/data/QuerySessionInfo';
import { getSessionHistory } from 'normandy/state/app/session/selectors';
import ShieldIdenticon from 'normandy/components/common/ShieldIdenticon';

const { Divider, Item, SubMenu } = Menu;

@withRouter
@connect(
  state => ({
    recipeSessionHistory: getSessionHistory(state, 'recipe'),
    extensionSessionHistory: getSessionHistory(state, 'extension'),
  }),
)
export default class NavigationMenu extends React.PureComponent {
  static propTypes = {
    recipeSessionHistory: PropTypes.instanceOf(List).isRequired,
    extensionSessionHistory: PropTypes.instanceOf(List).isRequired,
    history: PropTypes.object.isRequired,
  };

  render() {
    const { recipeSessionHistory, extensionSessionHistory, history } = this.props;
    const { pathname, search } = history;

    return (
      <div className="nav-menu">
        <QuerySessionInfo />
        <Menu
          defaultOpenKeys={['Recipes', 'Extensions']}
          selectedKeys={[`${pathname}${search}`]}
          mode="inline"
        >
          <Item key="/"><Link to="/">Home</Link></Item>

          <SubMenu title="Recipes" key="Recipes">
            <Item key="/recipe/">
              <Link to="/recipe/">View All</Link>
            </Item>

            {recipeSessionHistory.size > 0 && <Divider />}

            {
              recipeSessionHistory.map(item =>
                (<Item key={item.get('url')}>
                  <Link to={item.get('url')}>
                    <ShieldIdenticon seed={item.get('identicon')} size={20} />
                    { item.get('caption') }
                  </Link>
                </Item>),
              )
            }
          </SubMenu>

          <SubMenu title="Extensions" key="Extensions">
            <Item key="/extension/">
              <Link to="/extension/">View All</Link>
            </Item>

            {extensionSessionHistory.size > 0 && <Divider />}

            {
              extensionSessionHistory.map(item =>
                (<Item key={item.get('url')}>
                  <Link to={item.get('url')}>{ item.get('caption') }</Link>
                </Item>),
              )
            }
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
