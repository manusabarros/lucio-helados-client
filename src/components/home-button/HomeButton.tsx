import React, { useCallback } from "react";
import "./HomeButton.scss";
import { useHistory } from "react-router-dom";

const HomeButton = (props: any) => {
    const history = useHistory();
    const goTo = useCallback(() => {
        history.push(props.button.path);
    }, []);

    return (
        <div className="HomeButton" onClick={goTo}>
            <img src={props.button.image} alt={props.button.alt} />
            <span>{props.button.title}</span>
        </div>
    );
};

export default HomeButton;
