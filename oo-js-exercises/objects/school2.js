// eslint-disable-next-line max-lines-per-function
function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    notes: [],
    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },
    listCourses() {
      console.log(this.courses);
    },
    addCourse(course) {
      this.courses.push(course);
    },
    addNote(newCode, newNote) {
      let idx = this.notes.findIndex(oldNote => oldNote.code === newCode);
      if (idx !== -1) {
        this.notes[idx].note += `; ${newNote}`;
      } else {
        this.notes.push({code: newCode, note: newNote});
      }
    },
    updateNote(newCode, newNote) {
      let idx = this.notes.findIndex(oldNote => oldNote.code === newCode);
      if (idx !== -1) {
        this.notes[idx].note = `${newNote}`;
      } else {
        this.notes.push({code: newCode, note: newNote});
      }
    },
    viewNotes() {
      for (let note_ of this.notes) {
        let str = '';
        for (let course of this.courses) {
          if (course.code === note_.code) str += course.name;
        }
        console.log(`${str}: ${note_.note}`);
      }
    }
  };
}

const school = {
  students: [],
  addStudent(name, year) {
    if (!['1st', '2nd', '3rd', '4th', '5th'].includes(year)) return "Invalid year";
    let student = createStudent(name, year);
    this.students.push(student);
    return student;
  },
  enrollStudent(student, course) {
    student.addCourse(course);
  },
  addGrade(student, courseCode, grade) {
    for (let _course of student.courses) {
      if (_course.code === courseCode) {
        _course.grade = grade;
      }
    }
  },
  getReportCard(student) {
    for (let course of student.courses) {
      let grade = course.grade ?? 'In progress';
      console.log(`${course.name}: ${grade}`);
    }
  },
  courseReport(courseName) {
    let grades = [];
    let gradeSum = 0;
    for (let student of this.students) {
      let course = student.courses.find(_course => _course.name === courseName);
      if (course !== undefined && course.grade !== undefined) {
        grades.push({name: student.name, grade: course.grade});
        gradeSum += course.grade;
      }
    }
    if (grades.length === 0) console.log('undefined');
    else {
      console.log(`=${courseName} Grades=`);
      for (let student of grades) {
        console.log(`${student.name}: ${student.grade}`);
      }
      console.log(`---`);
      console.log(`Course Average: ${gradeSum / grades.length}`);
    }
  }
};

// Examples of created student objects with grades; methods
// on the objects are not shown here for brevity. The
// following are only showing the properties that aren't
// methods for the three objects
let paul = school.addStudent('Paul', '3rd');
school.enrollStudent(paul, {name: 'Math', code: 101});
school.addGrade(paul, 101, 95);
school.enrollStudent(paul, {name: 'Advanced Math', code: 102});
school.addGrade(paul, 102, 90);
school.enrollStudent(paul, {name: 'Physics', code: 202});
console.log(paul);
// {
//   name: 'paul',
//   year: '3rd',
//   courses: [
//     { name: 'Math', code: 101, grade: 95, },
//     { name: 'Advanced Math', code: 102, grade: 90, },
//     { name: 'Physics', code: 202, }
//   ],
// }
let mary = school.addStudent('Mary', '1st');
school.enrollStudent(mary, {name: 'Math', code: 101});
school.addGrade(mary, 101, 91);
console.log(mary);
// {
//   name: 'Mary',
//   year: '1st',
//   courses: [
//     { name: 'Math', code: 101, grade: 91, },
//   ],
// }
let kim = school.addStudent('Kim', '2nd');
school.enrollStudent(kim, {name: 'Math', code: 101});
school.addGrade(kim, 101, 93);
school.enrollStudent(kim, {name: 'Advanced Math', code: 102});
school.addGrade(kim, 102, 90);
console.log(kim);
// {
//   name: 'Kim',
//   year: '2nd',
//   courses: [
//     { name: 'Math', code: 101, grade: 93, },
//     { name: 'Advanced Math', code: 102, grade: 90, },
//    ],
// }

school.getReportCard(paul);
// = Math: 95
// = Advanced Math: 90
// = Physics: In progress

school.courseReport('Math');
// = =Math Grades=
// = Paul: 95
// = Mary: 91
// = Kim: 93
// = ---
// = Course Average: 93

school.courseReport('Advanced Math');
// = =Advanced Math Grades=
// = Paul: 90
// = Kim: 90
// = ---
// = Course Average: 90

school.courseReport('Physics');
// = undefined