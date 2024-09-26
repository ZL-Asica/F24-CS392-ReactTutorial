const CourseList = ({ courses }) => {

  // "courses": {
  //   "F101" : {
  //     "term": "Fall",
  //     "number": "101",
  //     "meets" : "MWF 11:00-11:50",
  //     "title" : "Computer Science: Concepts, Philosophy, and Connections"
  //   },
  //   "F110" : {
  //     "term": "Fall",
  //     "number": "110",
  //     "meets" : "MWF 10:00-10:50",
  //     "title" : "Intro Programming for non-majors"
  //   },
  //   "S313" : {
  //     "term": "Spring",
  //     "number": "313",
  //     "meets" : "TuTh 15:30-16:50",
  //     "title" : "Tangible Interaction Design and Learning"
  //   },
  //   "S314" : {
  //     "term": "Spring",
  //     "number": "314",
  //     "meets" : "TuTh 9:30-10:50",
  //     "title" : "Tech & Human Interaction"
  //   }
  // }

  // return be like this
  // Fall CS 101: Computer Science: Concepts, Philosophy, and Connections
  // Fall CS 110: Intro Programming for non-majors
  // Spring CS 313: Tangible Interaction Design and Learning
  // Spring CS 314: Tech & Human Interaction

  return (
    <div>
      {Object.values(courses).map(course => (
        <div key={course.number}>
          <p>{course.term} CS {course.number}: {course.title}</p>
        </div>
      ))}
    </div>
  );
}

export default CourseList;
