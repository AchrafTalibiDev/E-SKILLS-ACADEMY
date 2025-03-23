import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';

function AddCourse() {
  const navigate  = useNavigate();
  const[error , setError] = useState('');
  const [formData, setFormData] = useState({
    courseName: '',
    tutor:'',
    price:'',
    description:'',
    video:'',
    photo:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log('Cours Ajouté !!');
        navigate("/courses");
      } else {
        const data = await response.json();
        setError(data.error)
      }
    } catch (error) {
      setError('course add error:', error);
    }
  };

  return (
    <div className='add'>
    <div className='container1'>
      <h2>Nouveau cours</h2>
      <form onSubmit={handleSubmit} className="addCourse-form">
      <label>Nom : </label>
      <input type="text" name="courseName" value={formData.courseName} onChange={handleChange}  required style={{width:"100%  "}}/>
      <label>Formateur : </label>
      <input type="text" name="tutor" value={formData.tutor} onChange={handleChange}  required style={{width:"100%"}}/>

      <label>description : </label>
      <textarea name="description"  value={formData.description} onChange={handleChange}  required style={{width:"100%", height:"100px"}}/>
      <label>Lien Video : </label>
      <input type="text" name="video" value={formData.video} onChange={handleChange}  required style={{width:"100%"}}/>
      <label>Lien Image : </label>
      <input type="text" name="photo" value={formData.photo} onChange={handleChange}  required style={{width:"100%"}}/>
        {error && <span className='error-msg'>{error}</span>}
        <div className='btn1'><button type="submit">Ajouter Cours</button></div>
      </form>
      </div>
    </div>
  );
}

export default AddCourse;
