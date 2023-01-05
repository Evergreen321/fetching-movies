import React, { useState, useRef } from "react";

import classes from "./AddMovie.module.css";

const isEmpty = (value) => value.trim() === "";

function AddMovie(props) {
  const [formInputsValidity, setFormInputValidity] = useState({
    title: true,
    text: true,
    date: true,
  });

  const titleRef = useRef();
  const openingTextRef = useRef();
  const releaseDateRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    // Form validation
    const enteredTitle = titleRef.current.value;
    const enteredOpeningText = openingTextRef.current.value;
    const enteredReleaseDate = releaseDateRef.current.value;

    const enteredTitleIsValid = !isEmpty(enteredTitle);
    const enteredOpeningTextIsValid = !isEmpty(enteredOpeningText);
    const enteredReleaseDateIsValid = !isEmpty(enteredReleaseDate);

    setFormInputValidity({
      title: enteredTitleIsValid,
      text: enteredOpeningTextIsValid,
      date: enteredReleaseDateIsValid,
    });

    const formIsValid =
      enteredTitleIsValid &&
      enteredOpeningTextIsValid &&
      enteredReleaseDateIsValid;

    if (!formIsValid) {
      return;
    }

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    props.onAddMovie(movie);
    titleRef.current.value = "";
    openingTextRef.current.value = "";
    releaseDateRef.current.value = "";
  }

  const titleControlClasses = `${classes.control} ${
    formInputsValidity.title ? "" : classes.invalid
  }`;
  const openingTextControlClasses = `${classes.control} ${
    formInputsValidity.text ? "" : classes.invalid
  }`;
  const releaseDateControlClasses = `${classes.control} ${
    formInputsValidity.date ? "" : classes.invalid
  }`;

  return (
    <form onSubmit={submitHandler}>
      <div className={titleControlClasses}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
        {!formInputsValidity.title && (
          <p className={classes.warning}>Please, enter a valid title!</p>
        )}
      </div>
      <div className={openingTextControlClasses}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea rows="5" id="opening-text" ref={openingTextRef}></textarea>
        {!formInputsValidity.text && (
          <p className={classes.warning}>Please, enter a valid opening text!</p>
        )}
      </div>
      <div className={releaseDateControlClasses}>
        <label htmlFor="date">Release Date</label>
        <input type="text" id="date" ref={releaseDateRef} />
        {!formInputsValidity.date && (
          <p className={classes.warning}>Please, enter a valid release date!</p>
        )}
      </div>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;
