const employee = require('../index')

describe("Employee class", () => {
    const employeeClass = 'employee'
    const employeeObject = {
        type: 'employee',
        Name: 'Joe Doe',
        ID: '123',
        Email: 'email@google.com',
    }
    const newEmployee = new employee(employeeObject, employeeClass)
    it("Ensure employee details are collected accruately", () => {
        expect(newEmployee.name).toBe('Joe Doe');
        expect(newEmployee.ID).toBe('123');
        expect(newEmployee.email).toBe('email@google.com');
        expect(newEmployee.type).toBe('employee');
    });

    it("Ensure employee functions work correctly", () => {
        expect(newEmployee.getName()).toBe('Joe Doe');
        expect(newEmployee.getID()).toBe('123');
        expect(newEmployee.getEmail()).toBe('email@google.com');
        expect(newEmployee.getRole()).toBe('employee');

    });
})