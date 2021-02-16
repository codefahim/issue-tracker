document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
    const getInputValue = id => document.getElementById(id).value;
    const description = getInputValue('issueDescription');
    const severity = getInputValue('issueSeverity');
    const assignedTo = getInputValue('issueAssignedTo');
    const id = Math.floor(Math.random() * 100000000) + '';
    const status = 'Open';

    const issue = { id, description, severity, assignedTo, status };
    let issues = [];
    if (localStorage.getItem('issues')) {
        issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueInputForm').reset();
    fetchIssues();
    issueManage();
    e.preventDefault();
}


const setStatusClosed = id => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const currentIssue = issues.find(issue => issue.id == id);

    currentIssue.status = 'Closed';
    currentIssue.description = `<h3 style="text-decoration: line-through;">${currentIssue.description}</h3>`;

    localStorage.setItem('issues', JSON.stringify(issues));
    issueManage();
    fetchIssues();

}
issueManage();

function deleteIssue(event, id) {
    event.preventDefault();
    const issues = JSON.parse(localStorage.getItem('issues'));
    const remainingIssues = issues.filter(issue => issue.id != id)

    localStorage.setItem('issues', JSON.stringify(remainingIssues));
    issueManage();

};

const fetchIssues = () => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
        const { id, description, severity, assignedTo, status } = issues[i];

        issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="event.preventDefault(); setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(event, ${id})"class="btn btn-danger">Delete</a>
                              </div>`;
    }
}


function issueManage() {
    const totalIssue = document.getElementById('totalIssue');
    const solved = document.getElementById('solvedIssue');
    const issues = JSON.parse(localStorage.getItem('issues'));
    const closed = issues.filter(closed => closed.status == 'Closed');
    totalIssue.innerText = issues.length;
    solved.innerText = closed.length;

}