import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from "prop-types";
import { createMessage, connectToChannel, leaveChannel } from '../../actions/room';
import MessageList from '../../components/MessageList';
import MessageForm from '../../components/MessageForm';
import RoomNavbar from '../../components/RoomNavbar';


class Room extends Component {
  static propTypes = {
    socket: propTypes.any.isRequired,
    match: propTypes.any.isRequired,
    room: propTypes.shape({
      id: propTypes.number,
      name: propTypes.string,
    }).isRequired,
    channel: propTypes.any.isRequired,
    params: propTypes.shape({
      id: propTypes.number
    }).isRequired,
    connectToChannel: propTypes.func.isRequired,
    leaveChannel: propTypes.func.isRequired
  }

  componentDidMount() {
    this.props.connectToChannel(this.props.socket, this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.leaveChannel(this.props.channel);
      this.props.connectToChannel(nextProps.socket, nextProps.match.params.id);
    }
    if (!this.props.socket && nextProps.socket) {
      this.props.connectToChannel(nextProps.socket, nextProps.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.leaveChannel(this.props.channel);
  }

  handleMessageCreate = (data) => {
    this.props.createMessage(this.props.channel, data);
  }

  render() {
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <RoomNavbar room={this.props.room} />
          <MessageList messages={this.props.messages} />
          <MessageForm onSubmit={this.handleMessageCreate} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    room: state.room.currentRoom,
    socket: state.session.socket,
    channel: state.room.channel,
    messages: state.room.messages
  }),
  { createMessage, connectToChannel, leaveChannel }
)(Room);