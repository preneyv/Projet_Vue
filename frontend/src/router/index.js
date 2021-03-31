import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import SubmitProject from "../views/projects/Submit.vue"

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/entering",
		name: "LogPages",
		component: () => import("../views/Entering.vue"),
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		component: () => import("../views/Dashboard.vue"),
	},
	{
		path: "/about",
		name: "About",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import("../views/About.vue"),
	},
	{
		path: "/projects",
		name: "Projects",
		component: () => import("../views/Projects.vue"),
	},
	{
		path: "/project/:id",
		name: "Project",
		props: (route) => ({
			...route.params,
		}),
		component: () => import("../views/SingleProject.vue"),
	},
	// Projects
	{
		path: "/projects/submit",
		name: "SubmitProject",
		component: SubmitProject,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
