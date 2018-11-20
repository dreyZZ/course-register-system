<template>
  <div class="courses">
    <h3>Courses</h3>
    <div class="card">
      <div class="card-header">
        Add a new course
      </div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label>ID</label>
            <input v-model="courseData.course_id" type="text" class="form-control ml-sm-2 mr-sm-4 my-2"  required>
          </div>
          <div class="form-group">
            <label>Name</label>
            <input v-model="courseData.course_name" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Price</label>
            <input v-model="courseData.course_price" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
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
                <th scope="col">
                  Course ID
                </th>
                <th>
                  Course Name
                </th>
                <th>
                  Course Price
                </th>
                <th>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="course in sortedCourses" v-bind:key="course.id">
                <template v-if="editId == course.id">
                  <td><input v-model="editCourseData.course_id" type="text"></td>
                  <td><input v-model="editCourseData.course_name" type="text"></td>
                  <td><input v-model="editCourseData.course_price" type="text"></td>
                  <td>
                    <span class="icon">
                      <i  @click="onEditSubmit(course.id)" class="fa fa-check"></i>
                    </span>
                    <span class="icon">
                      <i  @click="onCancel" class="fa fa-ban"></i>
                    </span>
                  </td>
                </template>
                <template v-else>
                  <td>
                    {{course.course_id}}
                  </td>
                  <td>
                    {{course.course_name}}
                  </td>
                  <td>
                    {{course.course_price}}
                  </td>
                  <td>

                    <a href="#" class="icon">
                      <i v-on:click="onDelete(course.id)" class="fa fa-trash"></i>
                    </a>
                    <a href="#" class="icon">
                      <i v-on:click="onEdit(course)" class="fa fa-pencil"></i>
                    </a>
                    <router-link 
                    :to="{
                      name:'CoursePage', 
                      params:{id: course.id}
                    }" 
                    class="icon"
                    >
                      <i class="fa fa-eye"></i>
                    </router-link>
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
        'course_id': '',
        'course_name': '',
        'course_price': ''
      },
      editCourseData: {
        'id' : '',
        'course_id': '',
        'course_name': '',
        'course_price': ''
      },
      courses: []
    }
  },
  created() {
    this.getCourses()
    console.log(this.courses);
  },
  computed:{
    sortedCourses(){
      return this.courses.slice().sort((a,b)=>{
        return a.course_id - b.course_id
      })
    }
  },
  methods: {
    getCourses() {
      let mockCourses = [
        {
          course_id: 1,
          course_name: "Math",
          course_price: 30
        },
        {
          course_id: 2,
          course_name: "History",
          course_price: 40
        }
      ]

      let coursesArray = []
      let i = 0
      mockCourses.forEach((course)=>{
        coursesArray.push(course)
        coursesArray[i].id = course.course_id
        i++
      })

      this.courses = coursesArray


      // db.collection('courses').get().then(querySnapshot =>{
      //   const courses = []
      //   // querySnapshot.forEach((doc)=>{
      //   //   courses.push(doc.data())
      //   // })
      //   const coursesArray = []
      //   let i = 0
      //   querySnapshot.forEach((doc)=>{
      //     coursesArray.push(doc.data())
      //     coursesArray[i].id = doc.id
      //     courses.push(coursesArray[i])
      //     i++
      //   })
      //   // for(let key in querySnapshot.docs){
      //   //   coursesArray.push(querySnapshot.docs[key].data())
      //   //   coursesArray[key].id = querySnapshot.docs[key].id
      //   //   courses.push(coursesArray[key])
      //   // }
      //   this.courses = courses
      // })
    },
    onSubmit(){
      // db.collection('courses').add(this.courseData).then(this.getCourses)
      // this.courseData.course_id = ''
      // this.courseData.course_name = ''
      // this.courseData.course_price = ''

    },
    // onDelete(course_id){
    //   db.collection('courses').where('course_id', '==', course_id).get().then(querySnapshot =>{
    //     querySnapshot.forEach(doc=>{
    //       doc.ref.delete().then(this.getCourses)
    //     })
    //   })
    // }
    onDelete(id){
      // db.collection('courses').doc(id).delete().then((data)=> {
      //     this.getCourses()
      // })
    },
    onEdit(course){
      this.editId = course.id
      this.editCourseData.course_id = course.course_id
      this.editCourseData.course_name = course.course_name
      this.editCourseData.course_price = course.course_price
    },
    onCancel(){
      this.editId = ''
      this.editCourseData.course_id = ''
      this.editCourseData.course_name = ''
      this.editCourseData.course_price = ''
    },
    onEditSubmit (id){
      // db.collection("courses").doc(id).set(this.editCourseData).then(
      //   this.getCourses)
      //   this.editId = ''
      //   this.editCourseData.course_id = ''
      //   this.editCourseData.course_name = ''
      //   this.editCourseData.course_price = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
