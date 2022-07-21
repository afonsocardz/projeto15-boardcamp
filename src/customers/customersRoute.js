import { Router } from "express";
import { createCustomer, getCustomers, getCustomersById, updateCustomer } from "./customersController.js";
import { createCustomerValidation, updateCustomerValidaton } from "./customersMiddleware.js";


const route = Router();

route.get("/", getCustomers);
route.get("/:id", getCustomersById);
route.post("/", createCustomerValidation , createCustomer);
route.put("/:id", updateCustomerValidaton, updateCustomer)

export default route;