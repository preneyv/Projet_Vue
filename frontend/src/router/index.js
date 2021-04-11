import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"
import PageNotFound from "@/views/PageNotFound.vue"
import Entering from "@/views/Entering.vue"
import Projects from "@/views/Projects.vue"
import SingleProject from "@/views/SingleProject.vue"
import About from "@/views/About.vue"
import Submit from "@/views/projects/Submit.vue"
import Account from "@/views/Account.vue"
import Contact from "@/views/Contact.vue"
import Dashboard from "@/views/Dashboard.vue"
import { authGuard, guestGuard } from "./guards"

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
		beforeEnter: guestGuard,
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		component: Dashboard,
		beforeEnter: authGuard,
	},
	{
		path: "/account",
		name: "Account",
		component: Account,
		beforeEnter: authGuard,
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
		path: "/contact",
		name: "Contact",
		component: Contact,
	},
	{
		path: "/projects/submit",
		name: "SubmitProject",
		component: Submit,
		beforeEnter: authGuard,
	},
	{
		path: "/:catchAll(.*)",
		name: "PageNotFound",
		component: PageNotFound,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
