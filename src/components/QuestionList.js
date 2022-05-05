import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false)
  const [deleteID, setDeleteID] = useState("")

  useEffect(() => {
    const dbData = JSON.parse(localStorage.getItem('questions'));     
    setQuestions(dbData);    
  }, []);

  const deleteQuestion = (id) => {
    setIsDeleteConfirm(true)
    setDeleteID(id);     
  };

  const onConfirm = () => {
    const filter_questions = questions.filter(item => item.id !== deleteID);
    setQuestions(filter_questions);
    localStorage.setItem('questions', JSON.stringify(filter_questions));  
    setIsDeleteConfirm(false)
  }

  const onCancel = () => {
    setIsDeleteConfirm(false)
  }

  return (
    <div className="row mt-5">
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        show={isDeleteConfirm}
        onConfirm={() => onConfirm()}
        onCancel={() => onCancel()}        
      >
        You will not be able to recover this!
      </SweetAlert>
      <div className="col-md-8 d-flex align-items-center">       
        <h2>Questions</h2>
        <Link to={'/add'} className="ml-3"><i className="fa fa-plus mr-1" aria-hidden="true"></i>Add Question</Link>
      </div>
      {questions !=null ? questions.map(item => (
        <div className="col-md-12 mt-3 d-flex align-items-center border-bottom border-dark" key={item.id}>
          <div className="col-md-8 text-left">{item.title}</div>
          <Link to={'/question/' + item.id} className="col-md-2 text-right"><i className="fa fa-pencil-square-o mr-1" aria-hidden="true"></i>Edit</Link>
          <Link to={'#'} className="col-md-2 text-right" onClick={() => deleteQuestion(item.id)}><i className="fa fa-trash mr-1" aria-hidden="true"></i>Delete</Link>
        </div> 
      )): ""}
    </div>
  );
};

export default QuestionList;
