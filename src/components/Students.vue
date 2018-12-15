<template>
  <div class="students">
    <h3>Students</h3>
    <div class="card">
      <div class="card-header">
        Add a new student
      </div>
      <div class="card-body">
        <form class="form-inline  " v-on:submit.prevent="addStudent">
          <div class="form-group">
            <label>Name</label>
            <input v-model="studentData.name" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Surname</label>
            <input v-model="studentData.surname" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label style="margin-right: 7px" for="sel1">Grade</label>
            <select style="margin-right: 20px" class="form-control" id="sel1" v-model="studentData.grade">
              <option disabled value="">Select</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <div class="form-group">
            <label style="margin-right: 7px" for="sel1">Gender</label>
            <select class="form-control" id="sel1" v-model="studentData.gender">
              <option disabled value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <!-- <div class="form-group">
              <label>Debt</label>
              <input v-model="studentData.debt" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div> -->
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Add</button>
          </div>
        </form>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-header">
        Student List
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
            <tr>
              <th scope="col"> Student Name</th>
              <th> Student Surname</th>
              <th> Student Grade</th>
              <th> Student Gender</th>
              <th> Student Debt</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="student in students" v-bind:key="student.id">
              <td> {{ student.name }}</td>
              <td> {{ student.surname }}</td>
              <td> {{ student.grade }}</td>
              <td> {{ student.gender }}</td>
              <td> {{ student.debt }}</td>
              <td>
                <a href="#" class="icon">
                  <i v-on:click="showRequestForm(student.id)" class="fa fa-arrow-circle-right"></i>
                </a>
                <a href="#" class="icon">
                  <i v-on:click="onDelete(student.id)" class="fa fa-trash"></i>
                </a>
              </td>
            </tr>
            </tbody>
          </table>
          <form id="requestForm" v-if="requestState">
            <select v-model="requestData.teacherId">
              <option v-for="teacher in teachers" v-bind:value="teacher.id">
                {{ teacher.name }} {{ teacher.surname }}
              </option>
            </select>
            <select v-model="requestData.courseId">
              <option v-for="course in courses" v-bind:value="course.id">
                {{ course.name }}
              </option>
            </select>
            <button type="submit">Make Request</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Students",
    data() {
      return {
        studentData: {
          id: "",
          debt: 0,
          gender: "",
          grade: "",
          name: "",
          surname: ""
        },
        requestData: {
          teacherId : "",
          studentId : "",
          courseId : ""
        },
        students: [],
        teachers: [],
        courses: [],
        requestState: false
      }
    },
    methods: {

      //Async
      makeRequest(){
        this.$http.post('makeRequest?studentId=' + this.requestData.studentId + '&courseId=' + this.requestData.courseId + '&teacherId=' + this.requestData.teacherId)
          .then(res => {
            console.log("res: ", res);
          })
          .catch(err => {
            console.log("err: ", err);
          })
          
        
      },  //Make Request for a Student
      getStudents() {
        let fetchedStudents = [];

        this.$http.get('admin/student/list')
          .then((response) => {
            // console.log("Response body:", response.body);
            fetchedStudents = response.body;

            fetchedStudents.forEach((o, i) => o.indexId = i + 1);

            this.students = fetchedStudents;

            this.resetObject(this.studentData);
          }).catch((err) => {
          console.log(err);
        });
      },
      getTeachers() {
        this.$http.get('admin/teacher/list')
          .then((response) => {
            this.teachers = response.body;
          }).catch((err) => {
          console.log(err);
        });
      },
      getCourses() {
        this.$http.get('student/getCourseList')
          .then((response) => {
            this.courses = response.body;
            this.resetObject(this.courseData);
          }).catch((err) => {
            console.log(err);
        });
      },
      addStudent() {
        this.studentData.debt = 0

        this.$http.post('admin/student/add', this.studentData)
          .then((response) => {
            // console.log(response)
            this.getStudents()
          }).catch((err) => {
          console.log(err)
        })
      },
      onDelete(id) {
        this.$http.post("admin/student/delete/" + id)
          .then((response) => {
            // console.log('response: ', response);
            this.getStudents();
          }).catch((err) => {
          console.log('err: ', err);
        })
      },

      //Utility
      resetObject(obj) {
        Object.keys(obj).forEach(key => {
          obj[key] = "";
        })
      },

      //UI
      showRequestForm(studentId){
        this.requestState = !this.requestState;
        this.requestData.studentId = studentId;
      }
    },
    created() {
      this.getStudents()
      this.getTeachers()
      this.getCourses()
    },

  }
</script>

<style scoped>
  h3 {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
  }

  .icon {
    margin-right: 10px;
  }

  .icon i {
    cursor: pointer;
  }
</style>
