// Call to use file system/inquire modules within node.js
const inquirer = require('inquirer')
const fs = require('fs');

const finishedArray = ['Intern', 'Engineer', 'Finished']
const employees = []

const HTMLcards = (employee) => {
    return `
    <div class="card col-3" style = "border: 2px solid grey; margin: 10px;" >
        <div class="card-body">
            <h5 class="card-title">${employee.name}</h5>
            <p class="card-text">Role: ${employee.type}</p>
            <p class="card-text">ID: ${employee.ID}</p>
            <p class="card-text"><a href="${employee.email}">Email${employee.email}</a></p>
            <p class="card-text">Variable:${employee.otherVariable}</p>
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
    </body>

    ${HTMLcards(employees[0])}

</html >
    `;



var promptObjects = {
    manager: [`Enter your manager's name.`, `Enter your manager's ID number.`, `Enter your manager's email address.`, `Enter your manager's office number.`, 'Manager'],
    engineer: [`Enter this employee's name.`, `Enter this employee's ID number.`, `Enter this employee's email address.`, `Enter this employee's GitHub.`, 'Engineer'],
    intern: [`Enter this employee's name.`, `Enter this employee's ID number.`, `Enter this employee's email address.`, `Enter this employee's school.`, 'Intern'],



}
class employee {
    constructor(answers, type) {
        this.type = type
        this.name = answers.Name
        this.ID = answers.ID
        this.email = answers.Email
        this.otherVariable = answers.otherVariable

    }
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
            let newEmployee = new employee(answers, employeeType[4])
            employees.push(newEmployee)
            console.log(employees)

            if (answers.finished == 'Engineer') {
                init(promptObjects.engineer)
            }
            else if (answers.finished == 'Intern') {
                init(promptObjects.intern)
            }
            // // answers is then used to populate README Content
            else {
                const HTMLContent = HTMLWrite(employees);
                // const employeeCardContainer = HTMLContent.createElement("div")
                // // employeeCardContainer.classList.add('employeeCards d-flex justify-content-center')
                // var employeeCards = HTMLcards(employees[0]);
                // HTMLContent.append(employeeCards)
                // HTMLContent.append(employeeCardContainer)
                // creates HTML file
                fs.writeFile('Result.html', HTMLContent, (err) =>
                    err ? console.log(err) : console.log('Successfully created HTML!')
                );
            }
        })

}



// if (answers.finished == 'Engineer') {
//     this.employee = new engineer(answers.finished)
//     console.log(answers.finished)
//     this.employee.Questions()
// }
// else if (answers.finished == 'Intern') {
//     this.employee = new intern(answers.finished)
//     console.log(this.employee)
//             //     this.employee.Questions()
//             }

//             // else return
//             // // answers is then used to populate README Content
//             // const readmeContent = HTMLWrite(answers);

//             // creates README file
//             // fs.writeFile('Result.html', readmeContent, (err) =>
//             //     err ? console.log(err) : console.log('Successfully created HTML!')
//             // );
//         });
// }






// runs README generating functions from above on JS load.
init(promptObjects.manager)
