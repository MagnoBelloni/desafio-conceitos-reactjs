import React, { useState, useEffect } from "react";

import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories',
      {
        title: `Repositorio ${Date.now()}`,
        url: 'https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs',
        techs: ['reactjs', 'nodejs']
      });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      setRepositories(repositories.filter(repository => repository.id !== id));
    });
  }

  return (
    <div>
      <h1>Repositórios</h1>
      <br />
      <br />
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            <h3>{repository.title}</h3>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
