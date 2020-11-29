import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";

const PendingRequests = () => {
  const items = [
    { first: "first", last: "last", handle: "handle" },
    { first: "first", last: "last", handle: "handle" },
    { first: "first", last: "last", handle: "handle" },
    { first: "first", last: "last", handle: "handle" },
    { first: "first", last: "last", handle: "handle" },
    { first: "first", last: "last", handle: "handle" },
  ];
  return (
    <div>
      <header className="h5 mb-4">Credit Card Pending Requests</header>
      <table className="table table-hover">
        <caption>List of your pending credit card Requests</caption>
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <Item item={item} index={i} key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Item = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const detailsRef = useRef(null);

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (isOpen) {
      detailsRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{item.first}</td>
        <td>{item.last}</td>
        <td>{item.handle}</td>
        <td className="text-center">
          <Button className="btn btn-xs" onClick={handleToggle}>
            View Details
          </Button>
        </td>
      </tr>
      {isOpen && <Details myRef={detailsRef} />}
    </>
  );
};

export default PendingRequests;

const Details = ({ myRef }) => (
  <tr tabIndex="0" ref={myRef}>
    <td colSpan="5">more details here described like noother</td>
  </tr>
);
