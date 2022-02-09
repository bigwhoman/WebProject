import React from 'react';

function TheirMessage({lastMessage, message}) {
    const isFirstMessage = !lastMessage || lastMessage.sender.username !== message.sender.username;
    return (
        <div className={"message-row"}>
            {isFirstMessage && (
                <div
                    className={"message-avatar"}
                    style={{backgroundImage: `url(${message.sender.avatar})`}}
                />
            )}
            {
                (message?.attachments?.length > 0)
                    ? (
                        <img
                            src={message.attachments[0].file}
                            alt={"attachment"}
                            className={"message-image"}
                            style={{marginLeft: isFirstMessage ? '4px' : '48px'}}
                        />
                    ) : (
                        <div className={"message"}
                             style={{
                                 float: 'left',
                                 marginLeft: isFirstMessage ? '4px' : '48px',
                                 backgroundColor: '#cabcdc'
                             }}>
                            {message.text}
                        </div>
                    )
            }
        </div>
    );

}

export default TheirMessage;