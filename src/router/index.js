import Vue from 'vue'
import Router from 'vue-router'
import Courses from '@/components/Courses'
import Students from '@/components/Students'
import Teachers from '@/components/Teachers'
import CoursePage from '@/components/CoursePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/courses',
      name: 'Courses',
      component: Courses
    },
    {
      path: '/students',
      name: 'Students',
      component: Students
    },
    {
      path: '/teachers',
      name: 'Teachers',
      component: Teachers
    },
    {
      path: '/course/:id',
      name: 'CoursePage',
      component: CoursePage
    }
  ],
  mode: 'history'
})
