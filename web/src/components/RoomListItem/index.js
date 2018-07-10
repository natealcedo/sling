import React from 'react';
import propTypes from "prop-types";


const RoomListItem = ({ room, currentUserRoomIds, onRoomJoin }) => {
  const isJoined = currentUserRoomIds.includes(room.id);

  return (
    <div key={room.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <span style={{ marginRight: '8px' }}>{room.name}</span>
      <button
        type="button"
        onClick={() => onRoomJoin(room.id)}
        className="btn btn-sm"
        disabled={isJoined}
      >
        {isJoined ? 'Joined' : 'Join'}
      </button>
    </div>
  );
};

RoomListItem.propTypes = {
  room: propTypes.object.isRequired,
  currentUserRoomIds: propTypes.array.isRequired,
  onRoomJoin: propTypes.func.isRequired,
}

export default RoomListItem;