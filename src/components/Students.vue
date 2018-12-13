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
                  <i v-on:click="onDelete(student.id)" class="fa fa-trash"></i>
                </a>
              </td>
            </tr>
            </tbody>
          </table>
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
        students: []
      }
    },
    methods: {
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
      resetObject(obj) {
        Object.keys(obj).forEach(key => {
          obj[key] = "";
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

    },
    created() {
      this.getStudents()
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
