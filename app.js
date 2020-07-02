const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamMembers = []

promptManager()
function promptManager() {
    inquirer.prompt([
              {
                type: "input",
                name: "name",
                message: "What is your Name?",
                validate: async (input) => {
                    if (input == "" || /\s/.test(input)) {
                        return "Please enter first or last name.";
                    }
                    return true;
                }
              },
              {
                type: "input",
                name: "id",
                message: "What is your ID?",
                validate: async (input) => {
                    if (isNaN(input)) {
                        return "Please enter a number";
                    }
                    return true;
                }
                
              },
              {
                type: "input",
                name: "email",
                message: "What is your email?",
                validate: async (input) => {
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
              },
              {
                type: "input",
                name: "officenumber",
                message: "What is your office number?",
                validate: async (input) => {
                    if (isNaN(input)) {
                        return "Please enter a number";
                    }
                    return true;
                }
            },
            {
                type: "checkbox",
                name: "employeeType",
                message: "Do you want to add a new employee?",
                choices: ["Engineer", "Intern", "None"]
            }
    ]).then(function(answers){
            let x = new Manager(answers.name,answers.id,answers.email,answers.officenumber)
            teamMembers.push(x)
        if(answers.employeeType == "None"){
            createHTML()
        }
        if(answers.employeeType == "Intern"){
            promptIntern()
        }
        if(answers.employeeType == "Engineer"){
            promptEngineer()
        }       
       
    })
}
function promptIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your Name?",
            validate: async (input) => {
                if (input == "" || /\s/.test(input)) {
                    return "Please enter first or last name.";
                }
                return true;
            }
          },
          {
            type: "input",
            name: "id",
            message: "What is your ID?",
            validate: async (input) => {
                if (isNaN(input)) {
                    return "Please enter a number";
                }
                return true;
            }
            
          },
          {
            type: "input",
            name: "email",
            message: "What is your email?",
            validate: async (input) => {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                    return true;
                }
                return "Please enter a valid email address.";
            }
          },
              {
                type: "input",
                name: "school",
                message: "What school do you attend?"
            },
            {
                type: "checkbox",
                name: "employeeType",
                message: "Do you want to add a new employee?",
                choices: ["Engineer", "Intern", "None"]
            }
    ]).then(function(answers){
            let x = new Intern(answers.name,answers.id,answers.email,answers.school)
            teamMembers.push(x)
        if(answers.employeeType == "None"){
            createHTML()
        }
        if(answers.employeeType == "Intern"){
            promptIntern()
        }
        if(answers.employeeType == "Engineer"){
            promptEngineer()
        }       
       
    })
}

function promptEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your Name?",
            validate: async (input) => {
                if (input == "" || /\s/.test(input)) {
                    return "Please enter first or last name.";
                }
                return true;
            }
          },
          {
            type: "input",
            name: "id",
            message: "What is your ID?",
            validate: async (input) => {
                if (isNaN(input)) {
                    return "Please enter a number";
                }
                return true;
            }
            
          },
              
          {
            type: "input",
            name: "email",
            message: "What is your email?",
            validate: async (input) => {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                    return true;
                }
                return "Please enter a valid email address.";
            }
          },
              {
                type: "input",
                name: "github",
                message: "What is your github username?"
            },
            {
                type: "checkbox",
                name: "employeeType",
                message: "Do you want to add a new employee?",
                choices: ["Engineer", "Intern", "None"]
            }
    ]).then(function(answers){
            let x = new Engineer(answers.name,answers.id,answers.email,answers.github)
            teamMembers.push(x)
        if(answers.employeeType ==  "None"){
            createHTML()
        }
        if(answers.employeeType == "Intern"){
            promptIntern()
        }
        if(answers.employeeType == "Engineer"){
            promptEngineer()
        }       
       
    })
}



function createHTML(){
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
      }
  //******  teamMembers in fs.writeFileSync(outPath,render(teamMembers),"utf-8); is the array variable you are pushing team member objects to. IF your array is labeled differently make sure to change it here as well
      fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }







// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
