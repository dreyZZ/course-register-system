<template>
  <div class="single-product">
  	<div v-if="loaded">
	   	<h3>Course Detail</h3>
	   	<div class="card">
	      <div class="card-header">
	        header
	      </div>
	      <div class="card-body">
	        <p >Course Name: {{course.name}}</p>
	        <p >Course Price: ${{course.cost}}</p>
	        <p >Course Branch: ${{course.branch}}</p>
	        <p >Course Day: ${{course.day}}</p>
	        <button class="btn btn-success"> Buy Now</button>
	        <router-link :to="'/'" class="btn btn-primary"> Back </router-link>
	      </div>
		</div>
    </div>
    <div v-else> 
    	<h3>Loading...</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoursePage',
  data () {
    return {
    	course: {
				id:'',
    		branch: '',
    		name: '',
    		cost: '',
				day: ''
			},
    	loaded: false
    }
  },
  beforeCreate (){
		this.$http.post('admin/course/add', this.courseData)
			.then((response) => {
				console.log('response: ', response);
			}).catch((err) => {
				console.log('err: ', err);
			});
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

</style>
