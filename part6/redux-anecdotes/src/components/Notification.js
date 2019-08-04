import React from 'react'

const Notification = ({ store }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  const content = store.getState().notification;

  if (content) {
    return (
      <div style={style}>
        {content}
      </div>
    );
  }

  return null;
}

export default Notification