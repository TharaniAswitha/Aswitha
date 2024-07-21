function fetchProjects() {
  const username = document.getElementById('username').value;
  const projectsDiv = document.getElementById('projects');

  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => {
      if (!response.ok) {
        throw new Error('User not found');
      }
      return response.json();
    })
    .then(repos => {
      projectsDiv.innerHTML = '';
      repos.forEach(repo => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');
        projectElement.innerHTML = `
          <h2>${repo.name}</h2>
          <p>${repo.description}</p>
          <p><strong>Stars:</strong> ${repo.stargazers_count}</p>
          <p><strong>Forks:</strong> ${repo.forks_count}</p>
          <a href="${repo.html_url}" target="_blank">View Project</a>
        `;
        projectsDiv.appendChild(projectElement);
      });
    })
    .catch(error => {
      projectsDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
}
