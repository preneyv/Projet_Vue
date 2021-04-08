import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import Entering from "@/views/Entering.vue";
import Projects from "@/views/Projects.vue";
import SingleProject from "@/views/SingleProject.vue";
import About from "@/views/About.vue";
import Submit from "@/views/projects/Submit.vue";
import { authGuard, guestGuard } from "./guards";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/login",
		name: "LogPages",
		component: Entering,
		beforeEnter: guestGuard
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		component: () => import("../views/Dashboard.vue"),
		beforeEnter: authGuard
	},
	{
		path: "/about",
		name: "About",
		component: About,
	},
	{
		path: "/projects",
		name: "Projects",
		component: Projects,
	},
	{
		path: "/project/:id",
		name: "Project",
		component: SingleProject,
	},
	{
		path: "/projects/submit",
		name: "SubmitProject",
		component: Submit,
		beforeEnter: authGuard
	},
	{
		path: "/:catchAll(.*)",
		name: "PageNotFound",
		component: PageNotFound
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
