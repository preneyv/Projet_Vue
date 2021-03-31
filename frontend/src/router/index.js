import { createRouter, createWebHistory } from "vue-router"

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("../views/Home.vue"),
	},
	{
		path: "/login",
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
		component: () => import("../views/SingleProject.vue"),
	},
	{
		path: "/projects/submit",
		name: "SubmitProject",
		component: () => import("../views/projects/Submit.vue"),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
