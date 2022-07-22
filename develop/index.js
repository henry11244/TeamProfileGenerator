// Call to use file system/inquire modules within node.js
const inquirer = require('inquirer')
const fs = require('fs');

const finishedArray = ['Intern', 'Engineer', 'Finished']
const employees = []

questionsVariable = (employee) => {
    if (employee.type == 'Intern') { return `School: ${employee.otherVariable}` }
    else if (employee.type == 'Engineer') { return `GitHub: <a href="https://github.com/${employee.otherVariable}">https://github.com/${employee.otherVariable}</a>` }
    else { return `Office: ${employee.otherVariable}` }
}

const HTMLcards = (employee) => {
    return `
    <div class="card col-3" style = "border: 2px solid grey; margin: 10px;" >
        <div class="card-body">
            <h5 class="card-title">${employee.name}</h5>
            <p class="card-text">Role: ${employee.type}</p>
            <p class="card-text">ID: ${employee.ID}</p>
            <p class="card-text">Email: <a href="mailto:${employee.email}">${employee.email}</a></p>
            <p class="card-text">${questionsVariable(employee)}</p>
        </div>
</div >

    `}



// Function to write README file including the README template
const HTMLWrite = (employees) => `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Profile Generator</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<body>

    <div class="jumbotron jumbotron-fluid" style="background-color: rgb(42, 219, 204);">
        <div class="container">
            <h1 class="display-4" style="font-weight: bold; color: rgb(140, 10, 10)">The All-Star Team</h1>

            </div>
            </div>
            
    <div class="d-flex justify-content-center ml-2 flex-wrap">

            `;

const HTMLend = () => {
    return `

</div>
</body>


</html >`}

var promptObjects = {
    manager: [`Enter your manager's name.`, `Enter your manager's ID number.`, `Enter your manager's email address.`, `Enter your manager's office number.`, 'Manager'],
    engineer: [`Enter this employee's name.`, `Enter this employee's ID number.`, `Enter this employee's email address.`, `Enter this employee's GitHub.`, 'Engineer'],
    intern: [`Enter this employee's name.`, `Enter this employee's ID number.`, `Enter this employee's email address.`, `Enter this employee's school.`, 'Intern'],



}
class employee {
    constructor(answers, type) {
        this.type = 'employee'
        this.name = answers.Name
        this.ID = answers.ID
        this.email = answers.Email
        this.otherVariable = answers.otherVariable
    }
    getName = () => { return this.name }
    getID = () => { return this.ID }
    getEmail = () => { return this.email }
    getRole = () => { return this.type }
}
class Intern extends employee {
    constructor(answers, type) {
        super(answers, type)
        this.school = answers.otherVariable
        this.type = type
    }
    getSchool = () => { return this.school }
    getRole = () => { return this.type }
}
class Manager extends employee {
    constructor(answers, type) {
        super(answers, type)
        this.office = answers.otherVariable
        this.type = type
    }
    getRole = () => { return this.type }
}
class Engineer extends employee {
    constructor(answers, type) {
        super(answers, type)
        this.github = answers.otherVariable
        this.type = type
    }
    getGithub = () => { return this.github }
    getRole = () => { return this.type }
}


// function to prompt users for project information 
function init(employeeType) {
    inquirer.prompt([

        {
            type: 'input',
            name: 'Name',
            message: employeeType[0],
        },
        {
            type: 'input',
            name: 'ID',
            message: employeeType[1],
        },
        {
            type: 'input',
            name: 'Email',
            message: employeeType[2],
        },
        {
            type: 'input',
            name: 'otherVariable',
            message: employeeType[3],
        },
        {
            type: 'list',
            name: 'finished',
            message: 'Add another employee or finish?',
            choices: finishedArray
        },

    ])
        .then((answers) => {
            if (employeeType[4] == 'Engineer') { var newEmployee = new Engineer(answers, employeeType[4]) }
            else if (employeeType[4] == 'Intern') { var newEmployee = new Intern(answers, employeeType[4]) }
            else { var newEmployee = new Manager(answers, employeeType[4]) }
            employees.push(newEmployee)
            console.log(employees)
            const HTMLendl = HTMLend();
            if (answers.finished == 'Engineer') {
                init(promptObjects.engineer)
            }
            else if (answers.finished == 'Intern') {
                init(promptObjects.intern)
            }
            // // answers is then used to populate README Content
            else {
                console.log('test')
                const HTMLContent = HTMLWrite(employees);

                fs.writeFile('Result.html', HTMLContent, (err) =>
                    err ? console.log(err) : console.log('Successfully created HTML!')
                );
                console.log(employee[0])
                for (i = 0; i < employees.length; i++) {
                    fs.appendFile('Result.html', HTMLcards(employees[i]), (err) =>
                        err ? console.log(err) : console.log('card')
                    );
                }
            }

            if (count === employees.length) {
                setTimeout(function () {
                    fs.appendFile('Result.html', HTMLendl, (err) =>
                        err ? console.log(err) : console.log('end')
                    );
                }, 1000)
            }

        })
}



// runs README generating functions from above on JS load.
init(promptObjects.manager)

module.exports = employee
module.exports = Intern
module.exports = Engineer
module.exports = Manager