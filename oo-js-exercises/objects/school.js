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
      return this.courses;
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
      this.notes.forEach(note_ => {
        let str = '';
        this.courses.forEach(course => {
          if (course.code === note_.code) str += course.name;
        });
        console.log(`${str}: ${note_.note}`);
      });
    }
  };
}

let school = {
  students: [],
  addStudent(name, year) {
    if (!['1st', '2nd', '3rd', '4th', '5th'].includes(year)) return "Invalid Year";
    let student = createStudent(name, year);
    this.students.push(student);
    return student;
  },
  enrollStudent(student, course) {
    student.addCourse(course);
  },
  addGrade(student, courseName, grade) {
    let course = student.listCourses()
      .filter(course => course.name === courseName);
    if (course) course.grade = grade;
  },
  getReportCard(student) {
    student.listCourses().forEach(course => {
      console.log(`${course.name}: ${course.grade ?? 'In progress'}`);
    });
  },
  courseReport(courseName) {
    let courses = [];
    this.students.forEach(student => {
      student.courses.forEach(course => {
        if (!courses.includes(course)) courses.push(course);
        this.courses[this.courses.findIndex(course)];
      });
    });
    courses.forEach(course => {
      console.log(`=${course.name} Grades=`);
      let avg = 0;
      course.students.forEach((student, idx) => {
        let grade = course.grades[idx];
        avg += grade;
        console.log(`${student.name}: ${grade}`);
      });
      console.log('---');
      console.log(`Course Average: ${avg}`);
    });
  }
};

// Examples of created student objects with grades; methods
// on the objects are not shown here for brevity. The
// following are only showing the properties that aren't
// methods for the three objects

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

console.log(mary);
// {
//   name: 'Mary',
//   year: '1st',
//   courses: [
//     { name: 'Math', code: 101, grade: 91, },
//   ],
// }

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
// Math: 95
// Advanced Math: 90
// Physics: In progress

school.courseReport('Math');
// =Math Grades=
// Paul: 95
// Mary: 91
// Kim: 93
// ---
// Course Average: 93

school.courseReport('Advanced Math');
// =Advanced Math Grades=
// Paul: 90
// Kim: 90
// ---
// Course Average: 90

school.courseReport('Physics');
// undefined