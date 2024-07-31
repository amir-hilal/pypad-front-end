import React from 'react';
import '../assets/css/styles.css';
import CodeEditor from '../components/CodeEditor/CodeEditor';
import { useParams } from 'react-router-dom';

const EditCodePage = () => {
    const { id } = useParams();
    console.log(id);
  return (
    <CodeEditor id={id}/>
  );
};

export default EditCodePage;