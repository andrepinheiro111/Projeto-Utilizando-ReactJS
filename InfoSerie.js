
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { Badge } from 'reactstrap'

const InfoSerie = ({ match }) => {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState('INFO')

  const [data, setData] = useState({});
  useEffect(() => {
    Axios.get("/api/series/" + match.params.id).then(res => {
      setData(res.data);
    });
  }, [match.params.id]);

  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  const onChange = evt => {
    setName(evt.target.value);
  };

  const save = () => {
    Axios.post("/api/series", {
      name: name
    }).then(res => {
      setSuccess(true);
    });
  };

  if (success) {
    return <Redirect to="/series" />;
  }
  return (
    <div>

      <header style={masterHeader}>
        <div className='h-100' style={{ backgroundColor: 'rgba(0,0,0,0.7)'}}>
          <div className='h-100 container'>
          <div className='row h-100 align-items-center'>
            <div className='col-3'>
              <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster}/>
            </div>
            <div className='col-8'>
              <h1 className='font-weight-light text-white'>{data.name}</h1>
              <div className='lead text-white'>
                <Badge color='success'>Assistido</Badge>
                <Badge color='warning'>Para Assistir</Badge>
                Gênero: {data.genre}
              </div>
            </div>
          </div>
          </div>
        </div>
      </header>
      <div>
        <button className="btn btn-primary" onClick={() => setMode('EDIT')}>Editar</button>
      </div>

{
  mode === 'EDIT' &&
      <div className="container">
        <h1>Nova Série</h1>
        <button className="btn btn-primary" onClick={() => setMode('INFO')}>Cancelar Edição</button>
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
          <button type="button" onClick={save} className="btn btn-primary">
            Salvar
          </button>
        </form>
      </div>
}
    </div>
  );
};
export default InfoSerie;