import React from "react";
import './confirmationBox.css'
export default function ConfirmationBox(probs){
    const content = probs.content;
    const handleCancel = probs.cancel;
    const handleConfirm = probs.confirm;
    return(
        <div className="container">
            <div className="confirmation-box">
                <p className="content">
                    {content}
                </p>
                <div className="footer">
                    <div className="cancel" onClick={handleCancel}>Cancel</div>
                    <div className="confirm" onClick={handleConfirm}>Confirm</div>
                </div>
            </div>
        </div>
    )
}