import React, {useContext} from "react";
import './confirmationBox.css'
import { DarkMode } from "../../darkModeContext";
export default function ConfirmationBox(probs){
    const content = probs.content;
    const handleCancel = probs.cancel;
    const handleConfirm = probs.confirm;
    const {darkMode} = useContext(DarkMode);
    return(
        <div className="container">
            <div className={`confirmation-box ${darkMode && 'dark-mode'}`}>
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