import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Randomstring from "randomstring";
import SweetAlert from 'react-bootstrap-sweetalert';

const EditQuestion = (props) => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [editQuestion, setEditQuestion] = useState({});
  const [options, setOptions] = useState([]);
  const [isValid, setIsValid] = useState(false)
  const [isMaxLength, setIsMaxLength] = useState(false)
  const [isMaxOptions, setIsMaxOptions] = useState(false)
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false)
  const [deleteID, setDeleteID] = useState("")

  useEffect(() => {
    const editID = props.match.params.id;
    const dbData = JSON.parse(localStorage.getItem('questions'));
    const edit_question = dbData.filter(item => item.id === editID);    
    setEditQuestion(edit_question[0])
    setOptions(edit_question[0].optionValues);
    setTitle(edit_question[0].title)
  }, [props.match.params.id]);

  const handleTitleChange = (event) => {
    const { value } = event.target;
    if(value.length < 55) {
      setTitle(value)
      setIsMaxLength(false)
    } else {
      setIsMaxLength(true)
    }

    if(value === "") {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  };

  const handleOptionsChange = (event) => {
    const { name, value } = event.target;
    options.forEach(item => {
      if (item.opt_id === name) item.value = value
    })
    setOptions([...options])
  };

  const deleteOption = (id) => {    
    setDeleteID(id)    
    setIsMaxOptions(false)
    setIsDeleteConfirm(true)
  };

  const onConfirm = () => {
    const filter_opts = options.filter(item => item.opt_id !== deleteID)
    setOptions(filter_opts) 
    setIsDeleteConfirm(false)
  }

  const onCancel = () => {
    setIsDeleteConfirm(false)
  }

  const addNewOption = () => {
    if (options.length < 6) {
      setOptions([...options, { opt_id: Randomstring.generate(10), value: "" }]);
    } else {
      setIsMaxOptions(true)
    }
  };

  const saveHandle = () => { 
    validHandle();
    if(title !==""){     
      const dbData = JSON.parse(localStorage.getItem('questions'));
      dbData.forEach(item => {
        if (item.id === editQuestion.id) {
          item.title = title;
          item.optionValues = options;
        }
      })    
      localStorage.setItem('questions', JSON.stringify(dbData));
      history.push('/');
    }
  }

  const validHandle = () => {
    if(title === "") {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  return (
    <div>
       <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        show={isDeleteConfirm}
        onConfirm={() => onConfirm()}
        onCancel={() => onCancel()}        
      />  
      <div className="row mt-5">
        <div className="col-md-12 d-flex align-items-center justify-content-between border-bottom border-light-3">
          <h2>Edit Questions</h2>
          <div className="btns">
            <Link to={"/"} className="ml-3">
              Cancel
            </Link>
            <Link to={"#"}>
              <button type="button" className="btn btn-primary ml-5 px-4" onClick={() => saveHandle()}>
                Save
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <form>
            <div className="form-group">
              <label htmlFor="questionTitle">Question Title*</label>
              <input
                type="text"
                className="form-control"
                id="questionTitle"
                name="title"
                value={title}
                onChange={(e) => handleTitleChange(e)}
              />
              {isValid === true ? 
              <div name="invalid-feedback" className="text-danger">
                Please fill out this field.
              </div>
              : ""}
              {isMaxLength === true ?
              <small className="form-text text-right text-danger">
                Required (max 55 characters)
              </small>
              : "" }
            </div>
            <div className="form-group">
              {options.length !== 0 ? (
                <label htmlFor="options">Options</label>
              ) : (
                ""
              )}
              {options.map((item, index) => (
                <div
                  className="d-flex align-items-center justify-content-between mb-3"
                  key={item.opt_id}
                >
                  <input
                    type="text"
                    className="form-control col-md-11"
                    id="options"
                    name={item.opt_id}
                    value={item.value}
                    onChange={(e) => handleOptionsChange(e)}
                  />
                  <Link
                    to={"#"}
                    className="text-right"
                    onClick={() => deleteOption(item.opt_id)}
                  >
                    <i className="fa fa-trash mr-1" aria-hidden="true"></i>
                    Delete
                  </Link>
                </div>
              ))}
            </div>
            <div className="form-group mt-5 col-md-3 mx-auto">
              <Link
                to={"#"}
                className="form-text text-center"
                onClick={() => addNewOption()}
              >
                <i className="fa fa-plus mr-1" aria-hidden="true"></i>Add New
                Option
              </Link>
              {isMaxOptions === true ?
              <small className="form-text text-center text-danger">
                Max 6 options allowed
              </small>
              : "" }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
