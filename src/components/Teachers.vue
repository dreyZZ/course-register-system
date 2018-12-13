<template>
  <div class="teachers">
    <h3>Teachers</h3>
    <div class="card">
      <div class="card-header">
        Add a new teacher
      </div>
      <div class="card-body">
        <form class="form-inline  " v-on:submit.prevent="addTeacher">
          <div class="form-group">
            <label>Name</label>
            <input v-model="teacherData.name" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Surname</label>
            <input v-model="teacherData.surname" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Balance</label>
            <input v-model="teacherData.balance" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Branch</label>
            <input v-model="teacherData.branch" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Cost</label>
            <input v-model="teacherData.cost" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label style="margin-right: 7px" for="sel1">Gender</label>
            <select class="form-control" id="sel1" v-model="teacherData.gender">
              <option disabled value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <!-- <div class="form-group">
              <label>Debt</label>
              <input v-model="teacherData.debt" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div> -->
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Add</button>
          </div>
        </form>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-header">
        Teacher List
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
            <tr>
              <th scope="col"> Teacher Name</th>
              <th> Teacher Surname</th>
              <th> Teacher Balance</th>
              <th> Teacher Branch</th>
              <th> Teacher Cost</th>
              <th> Teacher Gender</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="teacher in teachers" v-bind:key="teacher.id">
              <td> {{ teacher.name }}</td>
              <td> {{ teacher.surname }}</td>
              <td> {{ teacher.balance }}</td>
              <td> {{ teacher.branch }}</td>
              <td> {{ teacher.cost }}</td>
              <td> {{ teacher.gender }}</td>
              <td>
                <a href="#" class="icon">
                  <i v-on:click="onDelete(teacher.id)" class="fa fa-trash"></i>
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
    name: "Teachers",
    data() {
      return {
        teacherData: {
          id: "",
          balance: "",
          branch: "",
          cost: 0,
          gender: "",
          name: "",
          surname: ""
        },
        teachers: []
      }
    },
    methods: {
      getTeachers() {
        let fetchedTeachers = [];

        this.$http.get('admin/teacher/list')
          .then((response) => {
            // console.log("Response body:", response.body);
            fetchedTeachers = response.body;

            fetchedTeachers.forEach((o, i) => o.indexId = i + 1);

            this.teachers = fetchedTeachers;

            this.resetObject(this.teacherData);
          }).catch((err) => {
          console.log(err);
        });
      },
      addTeacher() {
        this.$http.post('admin/teacher/add', this.teacherData)
          .then((response) => {
            // console.log(response)
            this.getTeachers()
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
        this.$http.post("admin/teacher/delete/" + id)
          .then((response) => {
            // console.log('response: ', response);
            this.getTeachers();
          }).catch((err) => {
          console.log('err: ', err);
        })
      },

    },
    created() {
      this.getTeachers()
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
