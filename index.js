function createEmployeeRecord(employeeInfo){
    const employee = {
        'firstName' : employeeInfo[0],
        'familyName' : employeeInfo[1],
        'title' : employeeInfo[2],
        'payPerHour' : employeeInfo[3],
        'timeInEvents' : [],
        'timeOutEvents' : []
    }
    return employee
}

function createEmployeeRecords(theArray){
    const newEmployees = theArray.map(createEmployeeRecord)
    return newEmployees
}

function createTimeInEvent(empRec, dateTime){
    const date = dateTime.split(' ')[0]
    const hour = parseInt(dateTime.split(' ')[1]);
    empRec.timeInEvents.push({'date': date, 'hour' : hour, 'type': 'TimeIn'} )
    return empRec
}

function createTimeOutEvent(empRec, dateTime){
    const date = dateTime.split(' ')[0]
    const hour = parseInt(dateTime.split(' ')[1]);
    empRec.timeOutEvents.push({'date': date, 'hour': hour, 'type': 'TimeOut'})
    return empRec
}

function hoursWorkedOnDate(empRec, date){
    const timeIn = empRec.timeInEvents.find(d => d.date === date).hour;
    const timeOut = empRec.timeOutEvents.find(d => d.date === date).hour;
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(empRec, date){
    const total = empRec.payPerHour * hoursWorkedOnDate(empRec, date)
    return total
}

function allWagesFor(empRec){
    const daysWorked = empRec.timeInEvents.map(e => e.date);
    const totalWages = daysWorked.reduce( (total, d) => total + wagesEarnedOnDate(empRec, d), 0 );
    return totalWages
}

function calculatePayroll(employees){
    const allEmployeesWages = employees.reduce((total, d)=> total + allWagesFor(d), 0);
    return allEmployeesWages
}

function findEmployeeByFirstName(empRec, name){
    const theName = empRec.find(f => name === f.firstName);
    return theName
}