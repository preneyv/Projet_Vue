import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"
import PageNotFound from "@/views/PageNotFound.vue"
import Entering from "@/views/Entering.vue"
import ListProjects from "@/views/projects/List.vue"
import ShowProject from "@/views/projects/Show.vue"
import About from "@/views/About.vue"
import CreateProject from "@/views/projects/Create.vue"
import Account from "@/views/users/Account.vue"
import Contact from "@/views/Contact.vue"
import Dashboard from "@/views/users/Dashboard.vue"
import { authGuard, guestGuard } from "./guards"

const routes = [
	// Home
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	// Authentication
	{
		path: "/login",
		name: "LogPages",
		component: Entering,
		beforeEnter: guestGuard,
	},
	// Users
	{
		path: "/account",
		name: "Account",
		component: Account,
		beforeEnter: authGuard,
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		component: Dashboard,
		beforeEnter: authGuard,
	},
	// Projects
	{
		path: "/projects",
		name: "ProjectList",
		component: ListProjects,
	},
	{
		path: "/project/:id",
		name: "Project",
		component: ShowProject,
	},
	{
		path: "/projects/create",
		name: "CreateProject",
		component: CreateProject,
		beforeEnter: authGuard,
	},
	// General informations
	{
		path: "/about",
		name: "About",
		component: About,
	},
	{
		path: "/contact",
		name: "Contact",
		component: Contact,
	},
	// Errors
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
