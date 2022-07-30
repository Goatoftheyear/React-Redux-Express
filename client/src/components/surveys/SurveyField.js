// SurveyFied contains logic to render a single
// label and text input
import React from "react";
// {touched && error}
// if touched is true and error contains anything
// it returns the string
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

//<Field type="text" name="surveyTitle" component="input" />
