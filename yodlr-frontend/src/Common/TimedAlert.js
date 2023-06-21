import React, {useState, useEffect} from 'react';
import {Alert} from "reactstrap";

function TimedAlert({message, color}) {
  const [alert, setAlert] = useState(true);

  useEffect(function showTimedMessage() {
    setTimeout(() => {
      setAlert(false);
    }, 7000);
  }, [alert]);

  return (
    <Alert isOpen={alert} color={color}>
      {message}
    </Alert>
  );
};

export default TimedAlert;