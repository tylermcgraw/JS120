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

let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"