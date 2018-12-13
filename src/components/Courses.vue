<template>
  <div class="courses">
    <h3>Courses</h3>
    <div class="card">
      <div class="card-header">
        Add a new course
      </div>
      <div class="card-body">
        <form class="form-inline  " v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label>Name</label>
            <input v-model="courseData.name" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Branch</label>
            <input v-model="courseData.branch" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Day</label>
            <input v-model="courseData.day" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Price</label>
            <input v-model="courseData.cost" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="ml-auto text-right">
          <button type="submit" class="btn btn-primary my-2">Add</button>
            
          </div>
        </form>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-header">
        Course List
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col"> Course Name </th>
                <th> Course Branch </th>
                <th> Course Day </th>
                <th> Course Price </th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="course in sortedCourses" v-bind:key="course.id">
                <template v-if="editId == course.id">
                  <!-- REMOVED: EDIT FUNCTIONALITY -->
                  <!-- <td><input v-model="editCourseData.name" type="text"></td>
                  <td><input v-model="editCourseData.branch" type="text"></td>
                  <td><input v-model="editCourseData.day" type="text"></td>
                  <td><input v-model="editCourseData.cost" type="text"></td>
                  <td>
                    <span class="icon">
                      <i  @click="onEditSubmit(course.id)" class="fa fa-check"></i>
                    </span>
                    <span class="icon">
                      <i  @click="onCancel" class="fa fa-ban"></i>
                    </span>
                  </td> -->
                </template>
                <template v-else>
                  <td> {{ course.name }} </td>
                  <td> {{ course.branch }} </td>
                  <td> {{ course.day }} </td>
                  <td> {{ course.cost }} </td>
                  <td>
                    <a href="#" class="icon">
                      <i v-on:click="onDelete(course.id)" class="fa fa-trash"></i>
                    </a>
                    <!-- REMOVED: EDIT COURSE -->
                    <!-- <a href="#" class="icon">
                      <i v-on:click="onEdit(course)" class="fa fa-pencil"></i>
                    </a> -->
                    <!-- REMOVED: ONE COURSE PAGE -->
                    <!-- <router-link 
                    :to="{
                      name:'CoursePage', 
                      params:{id: course.id}
                    }" 
                    class="icon"
                    >
                      <i class="fa fa-eye"></i>
                    </router-link> -->
                  </td>
                </template>
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
  name: 'Courses',
  data () {
    return {
      editId: '',
      courseData: {
        'id' : '',
        'name': '',
        'branch': '',
        'day': '',
        'cost': ''
      },
      editCourseData: {
        'id' : '',
        'name': '',
        'branch': '',
        'day': '',
        'cost': ''
      },
      courses: []
    }
  },
  created() {
    this.getCourses();
  },
  computed:{
    sortedCourses(){
      return this.courses.slice().sort((a,b)=>{
        return a.course_id - b.course_id
      });
    }
  },
  methods: {
    getCourses() {
      let fetchedCourses = [];

      this.$http.get('student/getCourseList')
        .then((response) => {
          // console.log("Response body:", response.body);
          fetchedCourses = response.body;

          fetchedCourses.forEach((o, i) => o.indexId = i + 1);

          this.courses = fetchedCourses;

          this.resetObject(this.courseData);
          // console.log('this.courses: ', this.courses);
        }).catch((err) => {
          console.log(err);
        });
    },

    resetObject(obj){
      Object.keys(obj).forEach(key => {
        obj[key] = "";
      });
    },

    onSubmit(){
      this.$http.post('admin/course/add', this.courseData)
        .then((response) => {
          // console.log('response: ', response);
          // setTimeout(check, 1000);
          this.getCourses();
        }).catch((err) => {
          console.log('err: ', err);
        });
    },

    onDelete(id){
      this.$http.post("admin/course/delete/" + id)
        .then((response) => {
          // console.log('response: ', response);
          this.getCourses();
        }).catch((err) => {
          console.log('err: ', err);
        });
    },
    onEdit(course){
      this.editId = course.id
      this.editCourseData.branch = course.branch
      this.editCourseData.day = course.day
      this.editCourseData.name = course.name
      this.editCourseData.cost = course.cost
    },

    onCancel(){
      this.resetObject(this.editCourseData);
    },

    onEditSubmit (id){
      
    }
  }
}
</script>

<style scoped>
  h3{
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .icon{
    margin-right: 10px;
  }
  .icon i{
    cursor: pointer;
  }
</style>
