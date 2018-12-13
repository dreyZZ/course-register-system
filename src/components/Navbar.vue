<template>
  <div class="header">
    <nav class="navbar navbar-light bg-light navbar-expand-lg">
      <div class="container">
		  <router-link class="navbar-brand" to="/">Course Register System</router-link>
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		    <span class="navbar-toggler-icon"></span>
		  </button>
		  <div class="collapse navbar-collapse" id="navbarNav">
		    <ul class="navbar-nav">
		      <li class="nav-item" :class="{ active: ac_courses }">
		        <a class="nav-link" href="/courses">Courses <span class="sr-only">(current)</span></a>
		      </li>
		      <li class="nav-item" :class="{ active: ac_students }">
		        <a class="nav-link" href="/students">Students</a>
		      </li>
		      <li class="nav-item" :class="{ active: ac_teachers }">
		        <a class="nav-link" href="/teachers">Teachers</a>
		      </li>
		    </ul>
		  </div>
		</div>
	</nav>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
    }
	},
	computed: {
		ac_courses(){
			return this.$route.path == "/courses"
		},
		ac_students(){
			return this.$route.path == "/students"
		},
		ac_teachers(){
			return this.$route.path == "/teachers"
		}
	},
	created(){
		// console.log('this.$route.path: ', this.$route.path);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
