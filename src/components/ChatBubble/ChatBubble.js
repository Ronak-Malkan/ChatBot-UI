import React from 'react';
import PropTypes from 'prop-types';
import './ChatBubble.css';
import { ReactComponent as RobotIcon } from '../../utilities/robot.svg';
import { ReactComponent as UserIcon } from '../../utilities/user.svg';

const ChatBubble = ({ message, isUser }) => {
    return (
        <>
            {isUser ? (
                <div className={`chat-bubble user`}>
                    <div className="message">
                        {message}
                    </div>
                    <div className="icon">
                        <UserIcon/>
                    </div>
                </div>
            ) : (
                <div className={`chat-bubble bot`}>
                    <div className="icon">
                        <RobotIcon/>
                    </div>
                    <div className="message">
                        {message}
                    </div>
                </div>
            )}
        </>
    );
};

ChatBubble.propTypes = {
    message: PropTypes.string.isRequired,
    isUser: PropTypes.bool.isRequired,
};

export default ChatBubble;