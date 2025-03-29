import { Alert } from "flowbite-react";

export function AlertComponent( {color,messageHead,message} ) {
  return (
    <Alert color={color} rounded className=" sticky top-14 z-40 " >
      <span className="font-medium">{messageHead} </span > <span className="font-sans" >{message}</span>
    </Alert>
  );
}

