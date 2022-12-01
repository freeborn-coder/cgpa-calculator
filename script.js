const removeCourse = function (event) {
    event.target.closest('.course').remove();
}

const removeSemester = function (event) {
    event.target.closest('.semester').remove();
}

const addCourse = function (event) {
    const parent = event.target.parentElement;
    const courseClone = parent.previousElementSibling.cloneNode(true);

    makeVisible(courseClone.querySelector('.remove-course'));
    clearFields(courseClone);

    parent.insertAdjacentElement('beforebegin', courseClone);
}

const clearFields = function (node) {
    const fields = node.querySelectorAll('input,select');
    for (let i=0; i<fields.length; i++) {
        fields[i].value = '';
    }
}

const makeVisible = function (element) {
    element.style.visibility = 'visible';
}

const addSemester = function (event) {
    event.preventDefault();
    
    const semesterCount = document.querySelectorAll('.semester').length;
    const semesterClone = event.target.previousElementSibling.cloneNode(true);

    makeVisible(semesterClone.querySelector('.remove-semester'));

    semesterClone.querySelector('h2').textContent = 'Semester ' + (semesterCount + 1);

    clearFields(semesterClone.querySelector('.course'));
    const extraCourses = semesterClone.querySelectorAll('.course:not(:nth-child(2))');
    for (let i=0; i<extraCourses.length; i++) {
        extraCourses[i].remove();
    }
    
    event.target.insertAdjacentElement('beforebegin', semesterClone);   
}

const calculateSemesterGPA = function (event) {
    const semester = event.target.closest('.semester');
    const courses = semester.querySelectorAll('.course');
    semester.querySelector('.semester-gpa').textContent = 'Semester GPA: ' + computeGPA(courses);
}

const calculateCumulativeGPA = function (event) {
    const courses = document.querySelectorAll('.course');
    document.querySelector('#cgpa').textContent = computeGPA(courses);
    document.querySelector('#total-qp').textContent = computeTotalQualityPoints(courses);
}

const computeGPA = function (courses) {
    let totalQualityPoints = 0;
    let totalCreditUnits = 0;

    for (let i=0;i<courses.length;i++) {
        const creditUnit = courses[i].querySelector('.credit-unit').value;
        const grade = courses[i].querySelector('.grade').value;
        const qualityPoint = Number(grade) * Number(creditUnit);
        
        if (isNaN(qualityPoint)) {
            return 0.00;
        }

        totalQualityPoints += qualityPoint;
        totalCreditUnits += Number(creditUnit);
    }

    const gpa = (totalQualityPoints / totalCreditUnits).toFixed(2);
    return isNaN(gpa) ? '0.00' : gpa;
}

const computeTotalQualityPoints = function (courses) {
    let totalQualityPoints = 0;

    for (i=0; i<courses.length; i++) {
        const creditUnit = courses[i].querySelector('.credit-unit').value;
        const grade = courses[i].querySelector('.grade').value;
        const qualityPoint = Number(grade) * Number(creditUnit);
        
        if (isNaN(qualityPoint)) {
            return '0.00';
        }

        totalQualityPoints += qualityPoint;
    }
    return totalQualityPoints.toFixed(2);
}
