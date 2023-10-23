import React, { useState, useEffect } from 'react';

const App = () => {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://api.github.com/repos/facebook/react/issues')
      .then(response => response.json())
      .then(data => setIssues(data))
      .catch(error => console.error('Error al obtener los issues:', error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredIssues = issues.filter(issue => issue.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <input type="text" placeholder="Buscar issues" value={searchTerm} onChange={handleSearch} />
      <ul>
        {filteredIssues.map(issue => (
          <li key={issue.id}>
            <div>
              <strong>ID: </strong> {issue.id}
            </div>
            <div>
              <strong>Título: </strong> <a href={issue.html_url} target="_blank" rel="noopener noreferrer">{issue.title}</a>
            </div>
            <div>
              <strong>Autor: </strong> {issue.user.login}
            </div>
            <div>
              <strong>Labels: </strong> {issue.labels.map(label => label.name).join(', ')}
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
