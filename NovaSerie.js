import React, { useState } from "react";
import Axios from 'axios';
import { Redirect } from 'react-router-dom'

const NovaSerie = () => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const onChange = evt =>{
        setName(evt.target.value)
    }

    const save = () =>{
        Axios.post('/api/series', {
            name: name
        })
        .then(res =>{
            setSuccess(true)
        })
    }

    if(success){
       return <Redirect to='/series' />
    }

  return (
    <div className="container">
      <h1>Nova Série</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            value={name}
            onChange={onChange}
            className="form-control"
            id="name"
            placeholder="nome da Série"
          />
        </div>
        <button type="button" onClick={save} className='btn btn-primary'>Salvar</button>
      </form>
    </div>
  );
};
export default NovaSerie;

