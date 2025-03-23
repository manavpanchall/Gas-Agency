import React from 'react';

function Success({ messages }) {
    return (
        <div>
            <div className="alert alert-success" role="alert">
                {messages}
            </div>
        </div>
    );
}

export default Success;