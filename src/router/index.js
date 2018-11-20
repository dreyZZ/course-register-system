import Vue from 'vue'
import Router from 'vue-router'
import Courses from '@/components/Courses'
import CoursePage from '@/components/CoursePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Courses',
      component: Courses
    },
    {
      path: '/course/:id',
      name: 'CoursePage',
      component: CoursePage
    }
  ]
})
